const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sendOTP, sendAffiliateWelcomeEmail } = require('./emailService');
const { supabase, checkDbConnection } = require('./supabase');
const config = require('./env');

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (config.server.allowedOrigins.indexOf(origin) !== -1 || config.server.allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = config.server.port || 8787;

// Temporary in-memory OTP storage (In production, use Redis or a DB table)
const otpStore = new Map();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/v1/send-otp', async (req, res) => {
  const { email, formData } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // 1. Store initial data in Supabase (unverified)
    if (formData) {
       const { error } = await supabase.from('affiliates').upsert([{
         full_name: formData.fullName,
         email: formData.email,
         phone: formData.phone,
         state: formData.state,
         city: formData.city,
         occupation: formData.occupation,
         reason: formData.reason,
         clinic_name: formData.clinicName,
         clinic_address: formData.clinicAddress,
         is_verified: false,
         updated_at: new Date()
       }], { onConflict: 'email' });

       if (error) console.error('Supabase Store Error (Before OTP):', error.message);
    }

    // 2. Generate and Send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await sendOTP(email, otp);
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 mins expiry
    
    res.json({ message: 'Data stored and OTP sent successfully' });
  } catch (error) {
    console.error('Error in send-otp flow:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.post('/api/v1/verify-otp', async (req, res) => {
  const { email, otp, formData } = req.body;
  
  const record = otpStore.get(email);
  if (!record) return res.status(400).json({ error: 'OTP not found' });
  
  if (record.expires < Date.now()) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP expired' });
  }
  
  if (record.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // OTP is valid
  otpStore.delete(email);

  try {
    // Update verification status in Supabase
    const { error } = await supabase
      .from('affiliates')
      .update({ is_verified: true, verified_at: new Date() })
      .eq('email', email);

    if (error) throw error;

    // 2. Send Welcome Email
    try {
       await sendAffiliateWelcomeEmail(email, formData.fullName);
    } catch (e) {
       console.error('Welcome Email Error:', e.message);
       // We don't fail the verification if email fails, but we log it
    }

    res.json({ message: 'OTP verified and registration confirmed' });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(200).json({ message: 'OTP verified', warning: 'Verification status not updated in DB' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await checkDbConnection();
});
