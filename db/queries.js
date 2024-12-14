import pool from './pool.js';

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function postMessage(message) {
  const { username, text, added } = message;
  await pool.query(
    `INSERT INTO messages (username, text, added) 
    VALUES ($1, $2, $3);`,
    [username, text, added]
  );
}

const db = { getAllMessages, postMessage };

export default db;
