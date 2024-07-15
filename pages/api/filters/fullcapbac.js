// Tạo kết nối
import { createConnection } from "@lib/mysql";

// Hàm handle 
export default async function handler(req, res) {
  try {
    const connection = await createConnection();
    //Query 
    const [rows] = await connection.query(`
      SELECT ID_CapBac, CapBac
      FROM Dim_CapBac
    `);
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
