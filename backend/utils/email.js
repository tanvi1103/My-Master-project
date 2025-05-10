const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madishamadiso00@gmail.com',
    pass: 'dpvd xwgr sxlw gptp',
  }
});

exports.sendVerificationEmail = async (email, code) => {
  try {
    const mailOptions = {
      from: `"Your App Name" <madishamadiso00@gmail.com}>`,
      to: email,
      subject: 'Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Verify Your Email</h2>
          <p>Please use the following verification code to complete your registration:</p>
          <div style="background: #f3f4f6; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 2px; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 24 hours.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};