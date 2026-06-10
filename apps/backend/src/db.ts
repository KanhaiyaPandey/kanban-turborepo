import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const initDb = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id     SERIAL PRIMARY KEY,
      title  TEXT   NOT NULL,
      status TEXT   NOT NULL DEFAULT 'todo'
    )
  `);
};

export default pool;
