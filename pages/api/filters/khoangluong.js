import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT DISTINCT KhoangLuong FROM Dim_KhoangLuong');
    await connection.end();

    const uniqueKhoangLuong = rows.map(row => row.KhoangLuong);
    res.status(200).json(uniqueKhoangLuong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
