import express from 'express';
import pool from '../connection/db.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const router = express.Router();

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    // Save token and expiry in DB (e.g., 1 hour)
    await pool.request()
      .input('email', email)
      .input('token', hashedToken)
      .input('expiry', new Date(Date.now() + 3600000)) // 1 hour later
      .query(`
        UPDATE Users 
        SET resetToken = @token, resetTokenExpiry = @expiry 
        WHERE email = @email
      `);

    // TODO: Send `token` via email to user (link: /reset-password?token=...)
    console.log(`Reset token for ${email}: ${token}`);

    res.json({ message: 'Reset token sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const user = result.recordset[0];

    // Check token expiry
    if (!user.resetToken || !user.resetTokenExpiry || new Date() > new Date(user.resetTokenExpiry)) {
      return res.status(400).json({ message: 'Token expired or invalid' });
    }

    const isValid = await bcrypt.compare(token, user.resetToken);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await pool.request()
      .input('email', email)
      .input('password', hashedPassword)
      .query(`
        UPDATE Users 
        SET password = @password, resetToken = NULL, resetTokenExpiry = NULL 
        WHERE email = @email
      `);

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
