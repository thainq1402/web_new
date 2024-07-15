/*
-- Query: SELECT * FROM ThongTinTuyenDung.Dim_CapBac
LIMIT 0, 5000

-- Date: 2024-06-05 00:50
*/
CREATE TABLE `Dim_CapBac` (
  `ID_CapBac` int(11) NOT NULL,
  `CapBac` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_CapBac`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (1,'Intership');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (2,'Fresher');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (3,'Junior');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (4,'Mid-level');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (5,'Senior');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (6,'Lead/Principal');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (7,'Project Manager');
INSERT INTO Dim_CapBac(`ID_CapBac`,`CapBac`) VALUES (8,'Khác');
