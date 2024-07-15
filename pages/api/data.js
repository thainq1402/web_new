import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  const { search, ...filters } = req.query;

  try {
    const connection = await createConnection();

    let query = 'SELECT * FROM Data_Lake';
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
      const [tinhthanhRows] = await connection.query('SELECT ID_TinhThanh FROM Dim_TinhThanh WHERE KhuVuc = ?', [filters.khuvuc]);
      const tinhthanhList = tinhthanhRows.map(row => row.ID_TinhThanh);
      if (tinhthanhList.length > 0) {
        filterClauses.push(`ID_TinhThanh IN (${tinhthanhList.map(() => '?').join(', ')})`);
        queryParams.push(...tinhthanhList);
      }
    }

    if (filters.capbac) {
      const [capbacRows] = await connection.query('SELECT ID_CapBac FROM Dim_CapBac WHERE CapBac = ?', [filters.capbac]);
      const capbacList = capbacRows.map(row => row.ID_CapBac);
      if (capbacList.length > 0) {
        filterClauses.push(`ID_CapBac IN (${capbacList.map(() => '?').join(', ')})`);
        queryParams.push(...capbacList);
      }
    }

    if (filters.kinhnghiem) {
      const [kinhnghiemRows] = await connection.query('SELECT ID_KinhNghiem FROM Dim_KinhNghiem WHERE KinhNghiem = ?', [filters.kinhnghiem]);
      const kinhnghiemList = kinhnghiemRows.map(row => row.ID_KinhNghiem);
      if (kinhnghiemList.length > 0) {
        filterClauses.push(`ID_KinhNghiem IN (${kinhnghiemList.map(() => '?').join(', ')})`);
        queryParams.push(...kinhnghiemList);
      }
    }

    if (filters.loaihinh) {
      const [loaihinhRows] = await connection.query('SELECT ID_LoaiHinh FROM Dim_LoaiHinh WHERE LoaiHinh = ?', [filters.loaihinh]);
      const loaihinhList = loaihinhRows.map(row => row.ID_LoaiHinh);
      if (loaihinhList.length > 0) {
        filterClauses.push(`ID_LoaiHinh IN (${loaihinhList.map(() => '?').join(', ')})`);
        queryParams.push(...loaihinhList);
      }
    }

    if (filters.khoangluong) {
      const [khoangluongRows] = await connection.query('SELECT KhoangLuong_ID FROM Dim_KhoangLuong WHERE KhoangLuong = ?', [filters.khoangluong]);
      if (khoangluongRows.length > 0) {
        filterClauses.push('ID_KhoangLuong = ?');
        queryParams.push(khoangluongRows[0].KhoangLuong_ID);
      }
    }

    if (filterClauses.length > 0) {
      query += ' WHERE ' + filterClauses.join(' AND ');
    }

    const [rows] = await connection.query(query, queryParams);
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
