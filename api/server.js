import pool from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let conn;

  try {
    const { username, email, password } = req.body;

    conn = await pool.getConnection();

    await conn.query(
      "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );

    res.status(200).json({ message: "User added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding user" });

  } finally {
    if (conn) conn.release();
  }
}