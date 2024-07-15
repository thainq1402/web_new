
import mysql from 'mysql2/promise';

export const createConnection = async () => {
  return await mysql.createConnection({
    host: '103.56.158.31',
    user: 'tuyendungUser',
    password: 'sinhvienBK',
    database: 'ThongTinTuyenDung',
  });
};
