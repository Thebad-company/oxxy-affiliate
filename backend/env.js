require('dotenv').config();
const crypto = require("node:crypto");
const { decrypt } = require("./utils/crypto-utils.js");

const MASTER_KEY = String(process.env.MASTER_KEY || "").trim();

const maybeDecrypt = (value) => {
  const str = String(value || "").trim();
  if (str.startsWith("enc:")) {
    if (!MASTER_KEY) {
      throw new Error("MASTER_KEY must be set to decrypt encrypted environment variables");
    }
    try {
      return decrypt(str.slice(4), MASTER_KEY);
    } catch (error) {
      throw new Error(`Failed to decrypt environment variable: ${error.message}`);
    }
  }
  return str;
};

const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || String(value).trim() === "") {
    return fallback;
  }
  const normalized = String(value).trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
};

const nodeEnv = String(process.env.NODE_ENV || "development").trim().toLowerCase();
const configuredJwtSecret = String(process.env.JWT_SECRET || "").trim();

if (nodeEnv === "production" && !configuredJwtSecret) {
  throw new Error("JWT_SECRET must be set in production");
}

const jwtSecret = maybeDecrypt(configuredJwtSecret) || crypto.randomBytes(48).toString("hex");

const config = Object.freeze({
  app: {
    name: "Oxxy Panel",
  },
  server: {
    port: parseInteger(process.env.PORT, 8787),
    env: nodeEnv,
    allowedOrigins: String(process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim()).filter(Boolean)
  },
  frontend: {
    url: String(process.env.FRONTEND_URL || "http://localhost:5173").trim()
  },
  email: {
    from: String(process.env.EMAIL_FROM || "").trim(),
    smtp: {
      host: String(process.env.SMTP_HOST || "").trim(),
      port: parseInteger(process.env.SMTP_PORT, 587),
      secure: parseBoolean(process.env.SMTP_SECURE, false),
      user: String(process.env.SMTP_USER || "").trim(),
      pass: maybeDecrypt(process.env.SMTP_PASS),
    },
  },
  auth: {
    jwtSecret,
    jwtExpiresIn: String(process.env.JWT_EXPIRES_IN || "7d").trim(),
  },
  cashfree: {
    appId: maybeDecrypt(process.env.CASHFREE_APP_ID),
    secretKey: maybeDecrypt(process.env.CASHFREE_SECRET_KEY),
    env: (process.env.CASHFREE_ENV || (process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX')).toUpperCase(),
  },
  db: {
    supabaseUrl: String(process.env.SUPABASE_URL || "").trim(),
    supabaseServiceKey: maybeDecrypt(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY),
  }
});

module.exports = config;
