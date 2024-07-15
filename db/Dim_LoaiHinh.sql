/*
-- Query: SELECT * FROM ThongTinTuyenDung.Dim_LoaiHinh
LIMIT 0, 5000

-- Date: 2024-06-05 00:54
*/
CREATE TABLE `Dim_LoaiHinh` (
  `ID_LoaiHinh` int(11) NOT NULL,
  `LoaiHinh` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_LoaiHinh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO Dim_LoaiHinh (`ID_LoaiHinh`,`LoaiHinh`) VALUES (1,'Toàn thời gian');
INSERT INTO Dim_LoaiHinh (`ID_LoaiHinh`,`LoaiHinh`) VALUES (2,'Bán thời gian');
INSERT INTO Dim_LoaiHinh (`ID_LoaiHinh`,`LoaiHinh`) VALUES (3,'Hình thức khác');
