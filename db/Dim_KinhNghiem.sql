/*
-- Query: SELECT * FROM ThongTinTuyenDung.Dim_KinhNghiem
LIMIT 0, 5000

-- Date: 2024-06-05 00:51
*/
CREATE TABLE `Dim_KinhNghiem` (
  `ID_KinhNghiem` int(11) NOT NULL,
  `Min` int(11) DEFAULT NULL,
  `Max` int(11) DEFAULT NULL,
  `KinhNghiem` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_KinhNghiem`),
  KEY `Dim_KinhNghiem_Fk1_idx` (`ID_KinhNghiem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO Dim_KinhNghiem (`ID_KinhNghiem`,`Min`,`Max`,`KinhNghiem`) VALUES (1,0,0,'Không yêu cầu');
INSERT INTO Dim_KinhNghiem (`ID_KinhNghiem`,`Min`,`Max`,`KinhNghiem`) VALUES (2,0,1,'Dưới 1 năm ');
INSERT INTO Dim_KinhNghiem (`ID_KinhNghiem`,`Min`,`Max`,`KinhNghiem`) VALUES (3,1,3,'1 - 3 năm ');
INSERT INTO Dim_KinhNghiem (`ID_KinhNghiem`,`Min`,`Max`,`KinhNghiem`) VALUES (4,3,5,'3 - 5 năm ');
INSERT INTO Dim_KinhNghiem (`ID_KinhNghiem`,`Min`,`Max`,`KinhNghiem`) VALUES (5,5,30,'Trên 5 năm');
