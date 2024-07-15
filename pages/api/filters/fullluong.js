import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT KhoangLuong_ID, KhoangLuong FROM Dim_KhoangLuong');
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
