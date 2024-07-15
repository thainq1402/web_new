import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT ID_KinhNghiem, KinhNghiem FROM Dim_KinhNghiem');
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
