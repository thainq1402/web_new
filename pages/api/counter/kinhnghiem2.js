import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();

    const [rows] = await connection.query('SELECT ID_KinhNghiem, COUNT(*) as count FROM Data_Lake GROUP BY ID_KinhNghiem');
    await connection.end();

    const counts = {};
    rows.forEach(row => {
      counts[row.ID_KinhNghiem] = row.count;
    });

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
