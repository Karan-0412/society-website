import express from 'express';
import pool, { sql } from '../../connection/db.js';

const router = express.Router();

// POST /api/join
router.post('/', async (req, res) => {
  const { name, email,phone, position, experience, portfolio, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, Email, and Message are required' });
  }

  try {
    // Insert data into JoinRequests table
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('phone', sql.VarChar, phone)
      .input('position', sql.VarChar, position || '')
      .input('experience', sql.VarChar, experience || '')
      .input('portfolio', sql.VarChar, portfolio || '')
      .input('message', sql.VarChar, message)
      .query(`
        INSERT INTO JoinRequests (name, email, phone,position, experience, portfolio, message)
        VALUES (@name, @email,@phone, @position, @experience, @portfolio, @message)
      `);

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Join form error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
