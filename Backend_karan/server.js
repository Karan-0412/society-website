import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';      

// Routes
import authRoutes from './src/routes/auth.js';
import joinRoutes from './src/routes/join.js';
import resetPasswordRoutes from './src/routes/reset-password.js';


import pool from './connection/db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:8080',
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS: Origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(passport.initialize()); 

/**
 * Routes
 */
app.use('/api/auth', authRoutes);           // Authentication route
app.use('/api/join', joinRoutes);           // Join route
app.use('/api/auth', resetPasswordRoutes);  // Reset password route

app.get('/health', async (_req, res) => {
  try {
    await pool.request().query('SELECT 1 AS ok');
    res.json({ ok: true, db: 'connected' });
  } catch (err) {
    console.error('❌ Health check failed:', err.message);
    res.status(500).json({ ok: false, db: 'disconnected' });
  }
});

/**
 * Start server
 */
const startServer = async () => {
  try {
    // Test DB connection before starting
    await pool.request().query('SELECT 1');
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
    });

    // Graceful shutdown (Ctrl+C / kill)
    process.on('SIGINT', async () => {
      console.log('\n Shutting down server...');
      process.exit(0);
    });

  } catch (error) {
    console.error(' Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
