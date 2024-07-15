import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT DISTINCT KinhNghiem FROM Dim_KinhNghiem');
    await connection.end();

    const uniqueKinhNghiem = rows.map(row => row.KinhNghiem);
    res.status(200).json(uniqueKinhNghiem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
