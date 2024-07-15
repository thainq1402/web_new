import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT COUNT(*) as total FROM Data_Lake WHERE ID >= 1705');
    await connection.end();
    res.status(200).json(rows[0].total);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
