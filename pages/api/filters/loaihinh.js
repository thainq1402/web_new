import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT DISTINCT LoaiHinh FROM Dim_LoaiHinh');
    await connection.end();

    const uniqueLoaiHinh = rows.map(row => row.LoaiHinh);
    res.status(200).json(uniqueLoaiHinh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
