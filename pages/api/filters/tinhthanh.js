import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT DISTINCT TinhThanh FROM Dim_TinhThanh');
    await connection.end();

    const uniqueTinhThanh = rows.map(row => row.TinhThanh);
    res.status(200).json(uniqueTinhThanh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
