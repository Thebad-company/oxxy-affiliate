const nodemailer = require('nodemailer');
const config = require('./env');

const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  auth: {
    user: config.email.smtp.user,
    pass: config.email.smtp.pass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.warn('[SMTP Warning] Failed to connect to Email server:', error.message);
  } else {
    console.log('[SMTP Check] Mail server is ready to take our messages.');
  }
});

exports.sendOTP = async (email, otp) => {
  return transporter.sendMail({
    from: `"Oxxy" <${config.email.from}>`,
    to: email,
    subject: `Affiliate Program OTP: ${otp}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; text-align: center; border: 1px solid #e5e7eb; padding: 40px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #10B981; font-size: 28px; margin-bottom: 10px;">Oxxy Affiliate Program</h1>
        <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px;">Thank you for applying to the Oxxy Affiliate Program. Please use the verification code below to complete your registration:</p>
        <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #111827; background: #f9fafb; padding: 20px; border-radius: 16px; margin: 20px 0; border: 1px dashed #d1d5db;">${otp}</div>
        <p style="color: #9ca3af; font-size: 14px;">This code is valid for 5 minutes.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f3f4f6;">
          <p style="color: #6b7280; font-size: 12px; line-height: 1.6;">If you did not request this code, please ignore this email. This is an automated message for verification purposes.</p>
        </div>
      </div>
    `
  });
};

exports.sendReceipt = async (email, orderId, amount) => {
  return transporter.sendMail({
    from: `"Oxxy Support" <${config.email.from}>`,
    to: email,
    subject: `Medical Savings Confirmed - Order #${orderId}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h1 style="color: #10B981;">Payment Successful!</h1>
        <p>Your Oxxy plan is now active. You can now save up to 40% on your medical bills instantly.</p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Amount Paid:</strong> ₹${amount}</p>
        </div>
        <p>Show your digital card at any network hospital to avail your discount.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">This is a system-generated receipt for your purchase on Oxxy.in</p>
      </div>
    `
  });
};

exports.sendAffiliateWelcomeEmail = async (email, name) => {
  return transporter.sendMail({
    from: `"Oxxy Partnerships" <${config.email.from}>`,
    to: email,
    subject: "Application Received - Oxxy Affiliate Program",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px;">
        <h1 style="color: #10B981; font-size: 24px;">Welcome to Oxxy, ${name}!</h1>
        <p>Your application for the **Oxxy Affiliate Program** has been successfully verified and received.</p>
        <p>Our team is currently reviewing your details. Once approved, you will receive your partner dashboard credentials and unique referral links.</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #dcfce7;">
          <h3 style="color: #166534; margin-top: 0;">What happens next?</h3>
          <ul style="color: #166534; padding-left: 20px;">
            <li>Profile review by our team (usually 24-48 hours)</li>
            <li>Verification of clinic/center details</li>
            <li>Onboarding call</li>
          </ul>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">© ${new Date().getFullYear()} Oxxy Healthcare. All rights reserved.</p>
      </div>
    `
  });
};

