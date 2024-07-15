import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const { tinhthanh, capbac, khuvuc, kinhnghiem, loaihinh, khoangluong } = req.query;
    const connection = await createConnection();

    let query = `
      SELECT ID_LoaiHinh, COUNT(*) as count
      FROM Data_Lake
      WHERE 1=1
    `;
    let queryParams = [];

    if (tinhthanh) {
      query += ' AND ID_TinhThanh = ?';
      queryParams.push(tinhthanh);
    }
    if (capbac) {
      query += ' AND ID_CapBac = ?';
      queryParams.push(capbac);
    }
    if (khuvuc) {
      query += ' AND ID_TinhThanh IN (SELECT ID_TinhThanh FROM Dim_TinhThanh WHERE KhuVuc = ?)';
      queryParams.push(khuvuc);
    }
    if (kinhnghiem) {
      query += ' AND ID_KinhNghiem = ?';
      queryParams.push(kinhnghiem);
    }
    if (loaihinh) {
      query += ' AND ID_LoaiHinh = ?';
      queryParams.push(loaihinh);
    }
    if (khoangluong) {
      query += ' AND ID_KhoangLuong = ?';
      queryParams.push(khoangluong);
    }

    query += ' GROUP BY ID_LoaiHinh';

    const [rows] = await connection.query(query, queryParams);
    await connection.end();

    const counts = {};
    rows.forEach(row => {
      counts[row.ID_LoaiHinh] = row.count;
    });

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
