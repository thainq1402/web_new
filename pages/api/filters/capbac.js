import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query('SELECT DISTINCT CapBac FROM Dim_CapBac');
    await connection.end();

    const uniqueCapBac = rows.map(row => row.CapBac);
    res.status(200).json(uniqueCapBac);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
