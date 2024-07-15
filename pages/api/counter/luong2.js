import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();

    const [rows] = await connection.query('SELECT ID_KhoangLuong, COUNT(*) as count FROM Data_Lake GROUP BY ID_KhoangLuong');
    await connection.end();

    const counts = {};
    rows.forEach(row => {
      counts[row.ID_KhoangLuong] = row.count;
    });

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message
    })}}
