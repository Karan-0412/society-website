import nodemailer from 'nodemailer';
import 'dotenv/config';
dotenv.config();
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT,       // usually 587
  secure: false,                     // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,     // your email
    pass: process.env.SMTP_PASS,     // your email password or app password
  },
});
