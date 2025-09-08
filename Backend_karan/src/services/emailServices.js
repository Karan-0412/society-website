import { createEmailTransporter } from '../config/email.js';

export const sendResetEmail = async (email, userName, resetToken) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>Hi ${userName || 'there'},</p>
        <p>We received a request to reset your password. Click the button below to proceed. This link expires in <strong>15 minutes</strong>.</p>
        <p style="text-align:center; margin: 24px 0;">
          <a href="${resetUrl}" style="background:#4f46e5; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px;">Reset Password</a>
        </p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn't request this, you can ignore this email.</p>
      </div>
    `;

    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `"Core Dashboard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html,
    });

    console.log(`Reset email sent successfully to ${email}`);
  } catch (error) {
    console.error('Failed to send reset email:', error);
    throw error;
  }
};

export const sendConfirmationEmail = async (email, userName) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password reset successful</h2>
        <p>Hi ${userName || 'there'},</p>
        <p>Your password was reset successfully on ${new Date().toLocaleString()}.</p>
        <p>If this wasn't you, please reset your password again and contact support immediately.</p>
      </div>
    `;

    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `"Core Dashboard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Successful',
      html,
    });

    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
};
