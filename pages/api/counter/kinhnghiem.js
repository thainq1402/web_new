import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  const { ...filters } = req.query;

  try {
    const connection = await createConnection();

    let query = `
      SELECT Dim_KinhNghiem.KinhNghiem, COUNT(*) as count
      FROM Data_Lake
      INNER JOIN Dim_KinhNghiem ON Data_Lake.ID_KinhNghiem = Dim_KinhNghiem.ID_KinhNghiem
    `;
    let queryParams = [];
    let filterClauses = [];

    if (filters.tinhthanh) {
      const [tinhthanhRows] = await connection.query('SELECT ID_TinhThanh FROM Dim_TinhThanh WHERE TinhThanh = ?', [filters.tinhthanh]);
      const tinhthanhList = tinhthanhRows.map(row => row.ID_TinhThanh);
      if (tinhthanhList.length > 0) {
        filterClauses.push(`ID_TinhThanh IN (${tinhthanhList.map(() => '?').join(', ')})`);
        queryParams.push(...tinhthanhList);
      }
    }

    if (filters.khuvuc) {
      filterClauses.push('ID_TinhThanh IN (SELECT ID_TinhThanh FROM Dim_TinhThanh WHERE KhuVuc = ?)');
      queryParams.push(filters.khuvuc);
    }

    if (filters.capbac) {
      filterClauses.push('ID_CapBac IN (SELECT ID_CapBac FROM Dim_CapBac WHERE CapBac = ?)');
      queryParams.push(filters.capbac);
    }

    if (filters.loaihinh) {
      filterClauses.push('ID_LoaiHinh IN (SELECT ID_LoaiHinh FROM Dim_LoaiHinh WHERE LoaiHinh = ?)');
      queryParams.push(filters.loaihinh);
    }

    if (filters.khoangluong) {
      filterClauses.push('ID_KhoangLuong IN (SELECT KhoangLuong_ID FROM Dim_KhoangLuong WHERE KhoangLuong = ?)');
      queryParams.push(filters.khoangluong);
    }

    if (filterClauses.length > 0) {
      query += ' WHERE ' + filterClauses.join(' AND ');
    }

    query += ' GROUP BY Dim_KinhNghiem.KinhNghiem';

    const [rows] = await connection.query(query, queryParams);
    await connection.end();

    const result = rows.reduce((acc, row) => {
      acc[row.KinhNghiem] = row.count;
      return acc;
    }, {});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
