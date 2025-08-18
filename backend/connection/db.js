import 'dotenv/config';
import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,   // should be "localhost"
  database: process.env.DB_NAME,   // "user"
  port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = await sql.connect(config);
console.log('✅ SQL Server connected');

export default pool;
export { sql };
