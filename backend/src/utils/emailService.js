const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

/**
 * Send verification email
 * @param {string} to - Recipient email
 * @param {string} token - Verification token
 * @returns {Promise<boolean>} - Success status
 */
const sendVerificationEmail = async (to, token) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Email configuration is missing. Please check your .env file.');
    return false;
  }

  try {
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: {
        name: 'TaleToManga',
        address: process.env.EMAIL_USER
      },
      to,
      subject: 'TaleToManga - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Welcome to TaleToManga!</h2>
          <p>Thank you for registering. Please verify your email address to activate your account.</p>
          <div style="margin: 20px 0;">
            <a href="${verificationUrl}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p>If the button doesn't work, you can also click on the link below or copy it to your browser:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail
}; 