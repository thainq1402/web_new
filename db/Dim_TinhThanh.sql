/*
-- Query: SELECT * FROM ThongTinTuyenDung.Dim_TinhThanh
LIMIT 0, 5000

-- Date: 2024-06-05 22:58
*/
CREATE TABLE `Dim_TinhThanh` (
  `ID_TinhThanh` int(11) NOT NULL,
  `TinhThanh` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `KhuVuc` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_TinhThanh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (1,'An Giang','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (2,'Bà Rịa - Vũng Tàu','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (3,'Bạc Liêu','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (4,'Bắc Giang','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (5,'Bắc Kạn','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (6,'Bắc Ninh','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (7,'Bến Tre','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (8,'Bình Dương','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (9,'Bình Định','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (10,'Bình Phước','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (11,'Bình Thuận','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (12,'Cà Mau','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (13,'Cao Bằng','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (14,'Cần Thơ','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (15,'Đà Nẵng','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (16,'Đắk Lắk','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (17,'Đắk Nông','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (18,'Điện Biên','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (19,'Đồng Nai','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (20,'Đồng Tháp','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (21,'Gia Lai','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (22,'Hà Giang','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (23,'Hà Nam','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (24,'Hà Nội','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (25,'Hà Tĩnh','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (26,'Hải Dương','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (27,'Hải Phòng','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (28,'Hậu Giang','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (29,'Hoà Bình','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (30,'Hưng Yên','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (31,'Khánh Hoà','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (32,'Kiên Giang','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (33,'Kon Tum','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (34,'Lai Châu','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (35,'Lạng Sơn','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (36,'Lào Cai','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (37,'Lâm Đồng','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (38,'Long An','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (39,'Nam Định','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (40,'Nghệ An','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (41,'Ninh Bình','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (42,'Ninh Thuận','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (43,'Phú Thọ','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (44,'Phú Yên','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (45,'Quảng Bình','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (46,'Quảng Nam','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (47,'Quảng Ngãi','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (48,'Quảng Ninh','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (49,'Quảng Trị','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (50,'Sóc Trăng','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (51,'Sơn La','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (52,'Tây Ninh','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (53,'Thái Bình','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (54,'Thái Nguyên','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (55,'Thanh Hoá','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (56,'Thừa Thiên Huế','Trung');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (57,'Tiền Giang','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (58,'Hồ Chí Minh','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (59,'Trà Vinh','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (60,'Tuyên Quang','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (61,'Vĩnh Long','Nam');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (62,'Vĩnh Phúc','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (63,'Yên Bái','Bắc');
INSERT INTO Dim_TinhThanh (`ID_TinhThanh`,`TinhThanh`,`KhuVuc`) VALUES (64,'Khác','Khác');
