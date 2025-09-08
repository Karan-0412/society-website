import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import passport from 'passport';      
import authRoutes from './routes/auth.js';
import pool from './connection/db.js';
import joinRoutes from './routes/join.js';
import resetPasswordRoutes from './routes/reset-password.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));


app.use(express.json());
app.use(passport.initialize());        // Initialize Passport

// Routes
app.use('/api/auth', authRoutes); // authentication route
app.use('/api/join', joinRoutes); // Join Route
app.use('/api/auth', resetPasswordRoutes); // Reset Password Route

// Health check
app.get('/health', async (_req, res) => {
  try {
    await pool.request().query('SELECT 1 AS ok');
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
