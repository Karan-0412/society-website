// backend/routes/auth.js
import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool, { sql } from '../../connection/db.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

const router = express.Router();

/* ------------------------ Passport Strategies ------------------------ */
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => done(null, profile)));
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
  }, (accessToken, refreshToken, profile, done) => done(null, profile)));
}

/* ------------------------ Email/Password Routes ------------------------ */

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email, and password are required' });
  }

  try {
    const existing = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .query('SELECT 1 FROM users WHERE username=@username OR email=@email');

    if (existing.recordset.length) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO users (username, email, password) VALUES (@username, @email, @password)');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email=@email');

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    // ✅ Check if user is in core_team
    const coreCheck = await pool.request()
      .input('user_id', sql.Int, user.id)
      .query('SELECT 1 FROM core_team WHERE user_id=@user_id');

    const role = coreCheck.recordset.length ? "core_team" : "member";

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* ------------------------ Password Reset Routes ------------------------ */
// Removed here to avoid duplicate/missing dependencies.
// Password reset endpoints are handled in `src/routes/reset-password.js`.

/* ------------------------ Google OAuth Routes ------------------------ */
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
}

/* ------------------------ GitHub OAuth Routes ------------------------ */
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
}

/* ------------------------ OAuth Callback Helper ------------------------ */
const handleOAuthCallback = async (req, res, user) => {
  try {
    const email = user.emails[0].value;

    let existingUser = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email=@email');

    if (!existingUser.recordset.length) {
      const username = user.displayName || user.username || email.split('@')[0];
      await pool.request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, '') // Empty password for OAuth users
        .query('INSERT INTO users (username, email, password) VALUES (@username, @email, @password)');

      existingUser = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM users WHERE email=@email');
    }

    const userRecord = existingUser.recordset[0];

    // ✅ Check if OAuth user is in core_team
    const coreCheck = await pool.request()
      .input('user_id', sql.Int, userRecord.id)
      .query('SELECT 1 FROM core_team WHERE user_id=@user_id');

    const role = coreCheck.recordset.length ? "core_team" : "member";

    const token = jwt.sign(
      { id: userRecord.id, email: userRecord.email, username: userRecord.username, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // ✅ Redirect to correct frontend page based on role
    if (role === "core_team") {
      res.redirect(`http://localhost:8080/core?token=${token}`);
    } else {
      res.redirect(`http://localhost:8080/dashboard?token=${token}`);
    }
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect('/login');
  }
};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => handleOAuthCallback(req, res, req.user)
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    (req, res) => handleOAuthCallback(req, res, req.user)
  );
}

export default router;
