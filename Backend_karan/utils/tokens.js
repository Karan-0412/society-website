import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DEFAULT_RESET_TOKEN_BYTES = parseInt(process.env.RESET_TOKEN_BYTES || '32', 10);
const DEFAULT_RESET_TOKEN_TTL_MINUTES = parseInt(process.env.RESET_TOKEN_TTL_MINUTES || '15', 10);

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return secret;
}

export async function generatePasswordResetToken(options = {}) {
  const bytes = options.bytes ?? DEFAULT_RESET_TOKEN_BYTES;
  const ttlMinutes = options.ttlMinutes ?? DEFAULT_RESET_TOKEN_TTL_MINUTES;

  const rawToken = crypto.randomBytes(bytes).toString('hex');
  const hashedToken = await bcryptjs.hash(rawToken, 10);
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

  return { token: rawToken, hashedToken, expiresAt };
}

export function isTokenExpired(expiresAt) {
  return !expiresAt || new Date() > new Date(expiresAt);
}

export async function verifyPasswordResetToken(providedToken, hashedToken, expiresAt) {
  if (isTokenExpired(expiresAt)) return false;
  if (!providedToken || !hashedToken) return false;
  return bcryptjs.compare(providedToken, hashedToken);
}

export function signAuthJwt(payload, options = {}) {
  const secret = getJwtSecret();
  const expiresIn = options.expiresIn ?? '1h';
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyAuthJwt(token) {
  try {
    const secret = getJwtSecret();
    return jwt.verify(token, secret);
  } catch (_err) {
    return null;
  }
}

export default {
  generatePasswordResetToken,
  verifyPasswordResetToken,
  isTokenExpired,
  signAuthJwt,
  verifyAuthJwt,
};


