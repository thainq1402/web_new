import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  const { ...filters } = req.query;

  try {
    const connection = await createConnection();

    let query = `
      SELECT Dim_KhoangLuong.KhoangLuong, COUNT(*) as count
      FROM Data_Lake
      INNER JOIN Dim_KhoangLuong ON Data_Lake.ID_KhoangLuong = Dim_KhoangLuong.KhoangLuong_ID
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

    if (filters.kinhnghiem) {
      filterClauses.push('ID_KinhNghiem IN (SELECT ID_KinhNghiem FROM Dim_KinhNghiem WHERE KinhNghiem = ?)');
      queryParams.push(filters.kinhnghiem);
    }

    if (filters.loaihinh) {
      filterClauses.push('ID_LoaiHinh IN (SELECT ID_LoaiHinh FROM Dim_LoaiHinh WHERE LoaiHinh = ?)');
      queryParams.push(filters.loaihinh);
    }

    if (filterClauses.length > 0) {
      query += ' WHERE ' + filterClauses.join(' AND ');
    }

    query += ' GROUP BY Dim_KhoangLuong.KhoangLuong';

    const [rows] = await connection.query(query, queryParams);
    await connection.end();

    const result = rows.reduce((acc, row) => {
      acc[row.KhoangLuong] = row.count;
      return acc;
    }, {});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
