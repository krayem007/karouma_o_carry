mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: df
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_acte` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `identifiant_fiscal` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `identifiant_tva` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code_categorie` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_filiale` int NOT NULL,
  `raison_sociale` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code_postal` int NOT NULL,
  `activite` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activite_date` date NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nature_entite` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `details_regime` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `secteur` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reset_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reset_token_expiry` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_accounts_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'1','1','1','1',1,'1','1',1,'1','2001-11-11','1@1.1','$2a$08$jrRJUg3NioBP5ij43Mb8beNmiX3UEc85QFoXbUQ9VCZHImfE0Y4ha','','',NULL,NULL,NULL),(2,'2','2','2','2',2,'2','2',2,'2','2002-02-02','2@2.2','$2a$08$tkSDSy0Vyw41vodMr/0dq.MzIK8p8mZPSEeK7Yx2ywYN7ChuNPcea','','',NULL,NULL,NULL),(3,'3','3','3','3',3,'3','3',3,'3','2003-03-13','3@3.3','$2a$08$Yb6zL7OToHF31ggkJ24r8ulXLNtWmzaiGgQPKslG2ThT/z.esijYK','','',NULL,NULL,NULL),(4,'4','4','4','4',4,'4','4',4,'4','2004-04-04','4@4.4','$2a$08$27Tnxm4NMT1LYy9CqhsJe.Qch.lxlmpoEJwMqFHyQFRUI5olXO9eq','','',NULL,NULL,NULL),(5,'5','5','5','5',5,'5','5',5,'5','2005-05-05','5@5.5','$2a$12$h7.hmpvkSic5PfCjw/GYw.8TD5M2ZfECvaT5W6HoTHKFFtBPa7Q/i','','',NULL,NULL,NULL),(6,'9','9','9','9',9,'9','9',9,'9','2009-09-09','9@9.9','$2a$12$LnfEQEevxh4sgk7z4e.4QuzNTeb8oxdKTo/yZFRUOjTaTj03TH0hS','','',NULL,NULL,NULL),(7,'TT1','1234567A','F','M',110,'Akram MORHAG','Rades Meliane Residence Maxula B01',2040,'test','2026-05-09','akrammorhag@gmail.com','$2b$12$59XTcf6kEWEStGRhX04AxOIWDHv/o/ZQcHAZiCafMACVkMWIBz9f.','PP','REEL_3','Type 1','11064d9fad51430f216b91fab471c38ed215d39af67c36dd345b26addeba1e0b',1783885104287),(10,'7','7','44','test',2,'Master de recherche en finance','Rades Méliane résidence maxula 2 B 01',2040,'777','1995-02-26','akrammorhag1@gmail.com','$2a$12$p1Al9fIaUebuhC.3dIQTMuxnFwZj2s8S53WS4JDT77a88vUQHsgMS','PM','IS_10','Type 1',NULL,NULL),(12,'5555','1234567','F','T',0,'Morhag','Sedouikech Djerba BP118',4145,'777','2001-02-26','akrammorhag111@gmail.com','$2a$12$R/ZEwMi04IqeFugaLk6kNubDX3JRPhPgI8X8PognmVoWy77508SZO','PM','IS_20','Type 1',NULL,NULL),(14,'037','1234567','D','G',0,'man','3576  Farland Avenue',7814,'fff','2012-02-28','akrammorhag11@gmail.com','$2a$12$H/J9ZPkU0R.0Keyx7ZZ19uBcvyftLK3PJK3oFhetagzfVdeErQju6','PM','IS_20','Type 1',NULL,NULL),(18,'ABC123','1234567','A','B',1,'Test Postman','123 Rue Test',1000,'Commerce','1970-01-01','postman@test.com','$2a$12$l6TJjT0bn8cErZe8R9Y7nOrIACT7EK2ezuDKDYEJpDZMbQczvI2dS','PP','FORFAITAIRE','Type 2',NULL,NULL),(19,'ABC123','1234567','A','B',1,'Test','123 Rue Test',1000,'Commerce','1970-01-01','max128@test.com','$2a$12$S3MjInBY0daTALCMStgRJeSLZCxw0nokcNBCRCZ8gyC7W3XGzze3e','PP','FORFAITAIRE','Type 2',NULL,NULL),(20,'TEST','1234567','F','M',1,'finance','Rades Méliane résidence maxula 2 B 01',2040,'test','1995-02-26','mkr@gmail.com','$2a$12$ZeD2G.ZQcYaGjV258/mE8ep30CG7Em6z39nFsQXPXnOihqBcHav/a','PM','IS_10','Type 1',NULL,NULL),(21,'ABC123','1234567','A','B',1,'Test','123 Rue Test',1000,'Commerce','1970-01-01','contact.declaration.facile@gmail.com','$2a$12$CzxBAR.fIDRBc.fUvkDIvO2yX5a3ZxgnOpcUbdOt7M3C1qFTc.dMW','PP','FORFAITAIRE','Type 2','173c57c1854cabc429bd83173d2d18c9590fe36181536e6f88baecd163ae471d',1783724898063),(22,'ABC123','1234567','A','B',1,'Test Postman','123 Rue Test',1000,'Commerce','1970-01-01','postman1111@test.com','$2a$12$l1me0drFfMUUEHpqQTaLnOw6N7Uim0IxgdDgRhPeNdRNR.r0PwgVW','PP','FORFAITAIRE','Type 2',NULL,NULL),(23,'ABC123','1234567','A','B',1,'Test','123 Rue Test',1000,'Commerce','1970-01-01','maxxxx128@test.com','$2a$12$4nhcHybyUdEWjt.moqRJHuaObhCAhuYkmXVKjv0ElintU3HeY3W9K','PP','FORFAITAIRE','Type 2',NULL,NULL),(25,'ABC123','1234567','A','B',1,'Test Postman','123 Rue Test',1000,'Commerce','1970-01-01','makramman48@gmail.com','$2b$12$ocofV9y.0ZbzUsSPYZLW3Okp3yguIuvbPVpXi5w/QnJvA/Ulr4DzG','PP','FORFAITAIRE','Type 2',NULL,NULL),(226,'TT1','10000000','F','M',0,'K6 User 0','0 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_0@k6test.local','$2b$10$tQU5YkmmovWx0wdUzVLQeuYFJxoVACtYRhdd1KuYy0zQYARziuPT6','PP','REEL_3','Type 2',NULL,NULL),(227,'TT1','10000001','F','M',0,'K6 User 1','1 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_1@k6test.local','$2b$10$fX47wYT8uNx/UV2kEqgGlOtL1IDrDgFOsBoyfpMsj7FRitQQQ3Rh.','PP','REEL_3','Type 2',NULL,NULL),(228,'TT1','10000002','F','M',0,'K6 User 2','2 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_2@k6test.local','$2b$10$wyb8m6dmK2sDcs0hc3MFQ.kLqXarWey2Hj7XlH5K5D69Jsluv4Qgq','PP','REEL_3','Type 2',NULL,NULL),(229,'TT1','10000003','F','M',0,'K6 User 3','3 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_3@k6test.local','$2b$10$WU677BuiD2CGPqMeCPp8TubcF6ZgYHWt.tDOhQZBmSYLPAaWwkRzm','PP','REEL_3','Type 2',NULL,NULL),(230,'TT1','10000004','F','M',0,'K6 User 4','4 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_4@k6test.local','$2b$10$iGaLHQz/rhJBflcGJTQv7uzUjnPToW0S.2o89XXKavZdpT0Sx.W2S','PP','REEL_3','Type 2',NULL,NULL),(231,'TT1','10000005','F','M',0,'K6 User 5','5 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_5@k6test.local','$2b$10$C70V15o3hgxBIGaHDDX.lefUy54LlLkgNPBYDk3IP4ESqHOfZ2JJe','PP','REEL_3','Type 2',NULL,NULL),(232,'TT1','10000006','F','M',0,'K6 User 6','6 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_6@k6test.local','$2b$10$AEg.bJFKlUlw5NHCfL9g3u/WRiyr6IB8JET1/S4TbAGQpycQhbd22','PP','REEL_3','Type 2',NULL,NULL),(233,'TT1','10000007','F','M',0,'K6 User 7','7 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_7@k6test.local','$2b$10$r4.5.iIfTjyTLhKILF7V0uQ54ydmAY9pVbkMpjj8AONKakR74J.SC','PP','REEL_3','Type 2',NULL,NULL),(234,'TT1','10000008','F','M',0,'K6 User 8','8 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_8@k6test.local','$2b$10$c53wX2G8DWlKsjLWmYrX/OPPaNQSTcGMnWfQIz6VAIMQES5Z82gfe','PP','REEL_3','Type 2',NULL,NULL),(235,'TT1','10000009','F','M',0,'K6 User 9','9 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_9@k6test.local','$2b$10$TIi70Kb/6UABVDX7jwf6QOdy4gdh6eSPoC/2tcUWhpeQk3LPcscIq','PP','REEL_3','Type 2',NULL,NULL),(236,'TT1','10000010','F','M',0,'K6 User 10','10 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_10@k6test.local','$2b$10$QDjrD/wr8Yu92Yt8xpGXs.nfdFXTFgf2VSH/Rfqn9uHf84XtdMMoy','PP','REEL_3','Type 2',NULL,NULL),(237,'TT1','10000011','F','M',0,'K6 User 11','11 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_11@k6test.local','$2b$10$3rOB1HSzk4j6.RiNxvVfg.U5jG2Tefs26Jr8F7PohbCxkfh3yLbdK','PP','REEL_3','Type 2',NULL,NULL),(238,'TT1','10000012','F','M',0,'K6 User 12','12 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_12@k6test.local','$2b$10$KP9T920Be.kFF1XaWQLnZe3WXPEK9f2C/BMnZAQJJRKizvwezmhgm','PP','REEL_3','Type 2',NULL,NULL),(239,'TT1','10000013','F','M',0,'K6 User 13','13 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_13@k6test.local','$2b$10$kzuVdezgNyknaq6FMjt20eSKjcMWYgjg8pcMIkDqpBoPqWGN3e2Gq','PP','REEL_3','Type 2',NULL,NULL),(240,'TT1','10000014','F','M',0,'K6 User 14','14 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_14@k6test.local','$2b$10$BPMV8S/PaCuvXUlOvJaPMeHJveP4nR4CFSBIaa4jP.FEbIj1umGtO','PP','REEL_3','Type 2',NULL,NULL),(241,'TT1','10000015','F','M',0,'K6 User 15','15 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_15@k6test.local','$2b$10$vj23HBeaKLhOj0J.y6kDAue.1BsVY/Bf5cLf3H.UpeWvWcOu87AyG','PP','REEL_3','Type 2',NULL,NULL),(242,'TT1','10000016','F','M',0,'K6 User 16','16 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_16@k6test.local','$2b$10$76MUtAEC1EDosDbP6nEqkOjyVzPGtGcQyA85jCJfzN7.uwHndJJxO','PP','REEL_3','Type 2',NULL,NULL),(243,'TT1','10000017','F','M',0,'K6 User 17','17 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_17@k6test.local','$2b$10$wyH1MStVEEPZvJnYQ8oRdO6FE7Na/FIBb9pJMQ2ST3pvv11RDRI6q','PP','REEL_3','Type 2',NULL,NULL),(244,'TT1','10000018','F','M',0,'K6 User 18','18 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_18@k6test.local','$2b$10$RLYqagRgaMhdovxWbAoO/Oky8PXbytbob9LHcvZ2iBKu7LkrUvkeW','PP','REEL_3','Type 2',NULL,NULL),(245,'TT1','10000019','F','M',0,'K6 User 19','19 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_19@k6test.local','$2b$10$.jSgpOcCkNKCTAFiASO09OSyL8ulc5uNO8pFR4aZCtnULFZhDZKYG','PP','REEL_3','Type 2',NULL,NULL),(246,'TT1','10000020','F','M',0,'K6 User 20','20 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_20@k6test.local','$2b$10$WUsk.IwwK4a1V5zGijs/T.WphvPzu2PUwfruiYx.4QPB5F5FnXtDe','PP','REEL_3','Type 2',NULL,NULL),(247,'TT1','10000021','F','M',0,'K6 User 21','21 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_21@k6test.local','$2b$10$XoKXUKaXqFIu/RyuaZjB9ejHoosQib5MC6Q7aIZxiFm3uG64sb5h.','PP','REEL_3','Type 2',NULL,NULL),(248,'TT1','10000022','F','M',0,'K6 User 22','22 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_22@k6test.local','$2b$10$SZgwLr8I6nCLQ/rYVy.fwe58Ci/RPm3CfxOG3yzGO/omaKC5seaJC','PP','REEL_3','Type 2',NULL,NULL),(249,'TT1','10000023','F','M',0,'K6 User 23','23 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_23@k6test.local','$2b$10$Ped4WGbwLsT38FsBI4aLNO41f.YTDTQ0myYc4sgdH8bezcYnsw2De','PP','REEL_3','Type 2',NULL,NULL),(250,'TT1','10000024','F','M',0,'K6 User 24','24 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_24@k6test.local','$2b$10$IX707DvVYCugP5v4Mu9iAe/1igek8Lrr14f78oFnE/HAvXdIc3i.W','PP','REEL_3','Type 2',NULL,NULL),(251,'TT1','10000025','F','M',0,'K6 User 25','25 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_25@k6test.local','$2b$10$DrYvcEz8CDH4GpFPSjv2VedM1uq0quPg5TuBd3RiwloqIXRteNKhW','PP','REEL_3','Type 2',NULL,NULL),(252,'TT1','10000026','F','M',0,'K6 User 26','26 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_26@k6test.local','$2b$10$gUhBibmdv5n4AN3pKwX48.e3ZS8Q82aaTEdGnAB..xbJWJB9y3Esq','PP','REEL_3','Type 2',NULL,NULL),(253,'TT1','10000027','F','M',0,'K6 User 27','27 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_27@k6test.local','$2b$10$IGwu6iWmWaNt0A3KtH0TUO5I5DfP6U1Jp23sqUUtFNdoN0P.juBbm','PP','REEL_3','Type 2',NULL,NULL),(254,'TT1','10000028','F','M',0,'K6 User 28','28 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_28@k6test.local','$2b$10$F593dufZ1ta5iR95jIfGXuuEy/naNNnXiYhYRuNln2CnoGcbZSyeO','PP','REEL_3','Type 2',NULL,NULL),(255,'TT1','10000029','F','M',0,'K6 User 29','29 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_29@k6test.local','$2b$10$aaVr5ib2Anqxf2EjYEAdtemuISemcFawNkDm1.fKUmHIuu1h0wdei','PP','REEL_3','Type 2',NULL,NULL),(256,'TT1','10000030','F','M',0,'K6 User 30','30 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_30@k6test.local','$2b$10$51TAe1bFMPLNiqZ0el/6xuc/ZpmOhyEliALz9.AqNxxSn.0BOv0Ly','PP','REEL_3','Type 2',NULL,NULL),(257,'TT1','10000031','F','M',0,'K6 User 31','31 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_31@k6test.local','$2b$10$vo2f/p64vn6wdjbJEP8XTuIU720jfw96wiVVbW4swrX3RMCXiGamy','PP','REEL_3','Type 2',NULL,NULL),(258,'TT1','10000032','F','M',0,'K6 User 32','32 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_32@k6test.local','$2b$10$Eo1aaSHPnbfrfbCUZMBOneJJX5J/rnNaOoUQRCrkJbyGwk9qWYxpC','PP','REEL_3','Type 2',NULL,NULL),(259,'TT1','10000033','F','M',0,'K6 User 33','33 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_33@k6test.local','$2b$10$AcyfwS5lwjN3j/Ufwm.dVuSbYu3iQbDfXgVj6dwyF39MO8kRej4o6','PP','REEL_3','Type 2',NULL,NULL),(260,'TT1','10000034','F','M',0,'K6 User 34','34 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_34@k6test.local','$2b$10$Iv0gWR.dY0NcP1E0UKECCOmc.P.ELCsn8De53yHn2SnvbW8i94GiK','PP','REEL_3','Type 2',NULL,NULL),(261,'TT1','10000035','F','M',0,'K6 User 35','35 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_35@k6test.local','$2b$10$6edKWsZ09kG/QDfBPXcZkepWaBS08ey73oXOSWzDbAywHv.keNC4q','PP','REEL_3','Type 2',NULL,NULL),(262,'TT1','10000036','F','M',0,'K6 User 36','36 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_36@k6test.local','$2b$10$5McxUIhsT7dKfWCd/7SbOunseJj5iUA3y1H6LpiVaMrdSO9lF8zdq','PP','REEL_3','Type 2',NULL,NULL),(263,'TT1','10000037','F','M',0,'K6 User 37','37 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_37@k6test.local','$2b$10$gOvzQDKFmNJMZGUhIHHWYOAI7SxmKrZGNNnzt4jyOiiP.csheAvnG','PP','REEL_3','Type 2',NULL,NULL),(264,'TT1','10000038','F','M',0,'K6 User 38','38 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_38@k6test.local','$2b$10$rjb1uHGtDWabnh8WHZNhIusN0eKuZbQrichjJwWKnnGXg2kHcuOkm','PP','REEL_3','Type 2',NULL,NULL),(265,'TT1','10000039','F','M',0,'K6 User 39','39 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_39@k6test.local','$2b$10$81A89EBK2qJ3i6artUaxrupUWQh9Dww0bGc.5N/MdcI7ovHXAVIy6','PP','REEL_3','Type 2',NULL,NULL),(266,'TT1','10000040','F','M',0,'K6 User 40','40 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_40@k6test.local','$2b$10$EKkMPuSDVfjKSZ1lKkXtfO2mM1NL9iCxWBwODBDvIPL4aexKyWRTC','PP','REEL_3','Type 2',NULL,NULL),(267,'TT1','10000041','F','M',0,'K6 User 41','41 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_41@k6test.local','$2b$10$Hez2XRgYNfJJtwvTyRS5aeeH2iGuD92G00586DoFlHec5slB8KU6.','PP','REEL_3','Type 2',NULL,NULL),(268,'TT1','10000042','F','M',0,'K6 User 42','42 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_42@k6test.local','$2b$10$ZFW1XK54U3ZFe.RXPNooouUVgS3naYnPuiUU1JJJ3/bVXVRIG7fYe','PP','REEL_3','Type 2',NULL,NULL),(269,'TT1','10000043','F','M',0,'K6 User 43','43 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_43@k6test.local','$2b$10$Y.pXQsNACvcT7.IE3qtR5uujiKfix/5bgw.4DBfYM9NJSPJ08bmBO','PP','REEL_3','Type 2',NULL,NULL),(270,'TT1','10000044','F','M',0,'K6 User 44','44 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_44@k6test.local','$2b$10$vpCSES5Esuz6/guGBu35GuX9T2zVbBjCn7Lp0IlAPx7JR/EiaWc8K','PP','REEL_3','Type 2',NULL,NULL),(271,'TT1','10000045','F','M',0,'K6 User 45','45 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_45@k6test.local','$2b$10$Y27/edE2g4hLylDdpNUHo.I8Rsy4Je.zt0x.JZ7ptZufaMrD/vYIu','PP','REEL_3','Type 2',NULL,NULL),(272,'TT1','10000046','F','M',0,'K6 User 46','46 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_46@k6test.local','$2b$10$Moan4z6Y3g1sFWzZ7XDrDuQAAcKmfbdHa6dZT48no7oCNmackMHWm','PP','REEL_3','Type 2',NULL,NULL),(273,'TT1','10000047','F','M',0,'K6 User 47','47 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_47@k6test.local','$2b$10$mz/JLKrIyHfPiSeJO8DTmeoNwBczrkIK/Xop62PQOOcHyTvaGpKF6','PP','REEL_3','Type 2',NULL,NULL),(274,'TT1','10000048','F','M',0,'K6 User 48','48 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_48@k6test.local','$2b$10$ycd.mJIZmtBtyNP8SZNiOe1LbD5zCVWYHsv7xZYtJqk.ImWZUhPRe','PP','REEL_3','Type 2',NULL,NULL),(275,'TT1','10000049','F','M',0,'K6 User 49','49 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_49@k6test.local','$2b$10$vEA8eEpRTyoGlI2sDKr8BOHw6zUXBiUM2cN1T6qSOxVyc6kkW8Eli','PP','REEL_3','Type 2',NULL,NULL),(276,'TT1','10000050','F','M',0,'K6 User 50','50 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_50@k6test.local','$2b$10$0BKWPCZXu8lsEpI2xh0AQO6o13ZfuD8pVInjn7jH7ceSDddpbAVLq','PP','REEL_3','Type 2',NULL,NULL),(277,'TT1','10000051','F','M',0,'K6 User 51','51 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_51@k6test.local','$2b$10$cFkUYK99JsImQ.sw54Ze2.vP/TqQS1o.4NQ3Wj9S//fR03NOReRmG','PP','REEL_3','Type 2',NULL,NULL),(278,'TT1','10000052','F','M',0,'K6 User 52','52 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_52@k6test.local','$2b$10$AqfQj02AdTN4iKYCXdLSRepqcvMNDrIXyKA0.NC6mcLomlb4Bl4Ve','PP','REEL_3','Type 2',NULL,NULL),(279,'TT1','10000053','F','M',0,'K6 User 53','53 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_53@k6test.local','$2b$10$aV.8aQS5tF2Ss8LFsmPnOOoqamtz9v8hTlsPgFLuY6gF0zHfjhwBC','PP','REEL_3','Type 2',NULL,NULL),(280,'TT1','10000054','F','M',0,'K6 User 54','54 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_54@k6test.local','$2b$10$NCeRCmOnuQcKQPuNLR5fFer3Ml3TIShCv.qPaqQPscYgV/cSHr9xu','PP','REEL_3','Type 2',NULL,NULL),(281,'TT1','10000055','F','M',0,'K6 User 55','55 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_55@k6test.local','$2b$10$XKX/iIvu1UF1574OY3EbPe.jcn2R.6Oh8aKQtfY9Y4yuz2uTLcYlW','PP','REEL_3','Type 2',NULL,NULL),(282,'TT1','10000056','F','M',0,'K6 User 56','56 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_56@k6test.local','$2b$10$rAAsqMhkdJ0E9pkqjt4zieLcmCmJJpqMcUuhX.YOG0jeOnsxnRvwK','PP','REEL_3','Type 2',NULL,NULL),(283,'TT1','10000057','F','M',0,'K6 User 57','57 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_57@k6test.local','$2b$10$zTbM8.IWkS7N5.8gM7R0nOtIhf4MqHZFtWAITdsBw2fiulWRriZ26','PP','REEL_3','Type 2',NULL,NULL),(284,'TT1','10000058','F','M',0,'K6 User 58','58 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_58@k6test.local','$2b$10$6yl8hmKtrj7XQVInmJ20Fefx4vBdTC0A9nMVYY9nnlGxNbpianG/m','PP','REEL_3','Type 2',NULL,NULL),(285,'TT1','10000059','F','M',0,'K6 User 59','59 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_59@k6test.local','$2b$10$nU8IFbdJ2LNC8qFmsgb12e3QcWAFEtsHHgWqfNR2l2626X7n18K62','PP','REEL_3','Type 2',NULL,NULL),(286,'TT1','10000060','F','M',0,'K6 User 60','60 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_60@k6test.local','$2b$10$TZvw6n4xqtnD/oOLTTjZmO8PWxTNpgNM1T4NyAjECJBbvPeZC7Sqi','PP','REEL_3','Type 2',NULL,NULL),(287,'TT1','10000061','F','M',0,'K6 User 61','61 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_61@k6test.local','$2b$10$gRPwpld329pBXopUX5stsOV2D9EJGAHzfmesfb5KXn6B91jba7tn6','PP','REEL_3','Type 2',NULL,NULL),(288,'TT1','10000062','F','M',0,'K6 User 62','62 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_62@k6test.local','$2b$10$OWuH1FYlxGBIs1MFZlexyu8vmDzkIn7phKVO3s/ogQcTnhkqLfKeW','PP','REEL_3','Type 2',NULL,NULL),(289,'TT1','10000063','F','M',0,'K6 User 63','63 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_63@k6test.local','$2b$10$3YL5j9vLLLYE5AaP604vLOK2sTIuklSYNcawn/0DCyLrwixBb9iMu','PP','REEL_3','Type 2',NULL,NULL),(290,'TT1','10000064','F','M',0,'K6 User 64','64 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_64@k6test.local','$2b$10$5eHWQ09EiwIrduTXapAwJu/t1G5qMpVA2eizbFUsZQKUoNSfoFjCm','PP','REEL_3','Type 2',NULL,NULL),(291,'TT1','10000065','F','M',0,'K6 User 65','65 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_65@k6test.local','$2b$10$qGp5RyV0D0GixKOoFKhMNeKmZBbzDVdyREs4sCE6gEAjLjCqCqXpi','PP','REEL_3','Type 2',NULL,NULL),(292,'TT1','10000066','F','M',0,'K6 User 66','66 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_66@k6test.local','$2b$10$CBo7KSby5Y69vCOsEzkfXehgowZXA15d1/X.ZH8DLpz7oPj1zZx8G','PP','REEL_3','Type 2',NULL,NULL),(293,'TT1','10000067','F','M',0,'K6 User 67','67 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_67@k6test.local','$2b$10$eqCLsQDqgNuHV97RV7u1QuarCprPkdr/bFRQ/KZu8ESOeTgKUwhBy','PP','REEL_3','Type 2',NULL,NULL),(294,'TT1','10000068','F','M',0,'K6 User 68','68 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_68@k6test.local','$2b$10$QfmafAZ1ZkPRTF/pm0qKKOzIWXHSdAF.vCuWsFFP37O4pVvrxmGw2','PP','REEL_3','Type 2',NULL,NULL),(295,'TT1','10000069','F','M',0,'K6 User 69','69 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_69@k6test.local','$2b$10$u6MVmJh63yjEmSfhTn9e0uB8XIRjEye8y1TGixyI0ltItySRMq7.u','PP','REEL_3','Type 2',NULL,NULL),(296,'TT1','10000070','F','M',0,'K6 User 70','70 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_70@k6test.local','$2b$10$7ZnptHAshxp9wF0KkP9bXOO2QMYwG32YvxwDENEuAwE28Q1aFPTxe','PP','REEL_3','Type 2',NULL,NULL),(297,'TT1','10000071','F','M',0,'K6 User 71','71 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_71@k6test.local','$2b$10$zIQly5FkEFtBtAbTrUIvieV1d/J72c.eYIoadHA.HTO8OnOdwklm2','PP','REEL_3','Type 2',NULL,NULL),(298,'TT1','10000072','F','M',0,'K6 User 72','72 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_72@k6test.local','$2b$10$2itlIYvIiDoHM15rkNhdQeNwB9zy/dH886VbjrIOzwsQle4nMjPq2','PP','REEL_3','Type 2',NULL,NULL),(299,'TT1','10000073','F','M',0,'K6 User 73','73 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_73@k6test.local','$2b$10$n5rZGD/7uBTKQBjrmzTbtuB35zcftNBBElBIrSLN.5sLjhU7jgbya','PP','REEL_3','Type 2',NULL,NULL),(300,'TT1','10000074','F','M',0,'K6 User 74','74 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_74@k6test.local','$2b$10$QIHFzf6wu7wUjJ7DtRVRHuTHsPiP1qvKibTkEmUa8M26TeIsJmzqm','PP','REEL_3','Type 2',NULL,NULL),(301,'TT1','10000075','F','M',0,'K6 User 75','75 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_75@k6test.local','$2b$10$nbGnvQBY1hbm8XIEDsaTkO0bO3o.vFFHbMfIIh2s4ghdqLg4GjtdC','PP','REEL_3','Type 2',NULL,NULL),(302,'TT1','10000076','F','M',0,'K6 User 76','76 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_76@k6test.local','$2b$10$U1X7T.6UlNQqjdW0Nf/anerpsRvSEZIAlU.Ze9Z0jETt0TYhtxxRu','PP','REEL_3','Type 2',NULL,NULL),(303,'TT1','10000077','F','M',0,'K6 User 77','77 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_77@k6test.local','$2b$10$jLA4jGMWn2//6TAZ4vmOceG1/L1p/n0os8l4Yp22Y5MMBXvFlkLQu','PP','REEL_3','Type 2',NULL,NULL),(304,'TT1','10000078','F','M',0,'K6 User 78','78 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_78@k6test.local','$2b$10$Z2PrauBUd3FB8anMVavvO.7tgtcNqbqTShZhb1Pd.4UPm3/SPSG/W','PP','REEL_3','Type 2',NULL,NULL),(305,'TT1','10000079','F','M',0,'K6 User 79','79 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_79@k6test.local','$2b$10$iFcNF1RZOSyg8JN/K19PoOfNgcHVuCeMDLCS60FgT1eWlbSXBg7nK','PP','REEL_3','Type 2',NULL,NULL),(306,'TT1','10000080','F','M',0,'K6 User 80','80 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_80@k6test.local','$2b$10$lMUusJJPXE1iq94xYZCOFeS2VDZyITrKyXqRpj7RgQfPvVvr8zDaq','PP','REEL_3','Type 2',NULL,NULL),(307,'TT1','10000081','F','M',0,'K6 User 81','81 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_81@k6test.local','$2b$10$MCjC0Fs1FDWSH9OGQ3kFzOb2mwDJeeQCk3Xx4v/FtYNqTjyO4N.oe','PP','REEL_3','Type 2',NULL,NULL),(308,'TT1','10000082','F','M',0,'K6 User 82','82 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_82@k6test.local','$2b$10$6deNBNOuGbzi0mW7KhqQo.lRkidmOYhp34yxGvf7R7bF52ivMrPoe','PP','REEL_3','Type 2',NULL,NULL),(309,'TT1','10000083','F','M',0,'K6 User 83','83 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_83@k6test.local','$2b$10$K846KOhY6MYn1rziHeYhK.fIAaYgVPGUeARCyPSCaWSqCtQfOopQW','PP','REEL_3','Type 2',NULL,NULL),(310,'TT1','10000084','F','M',0,'K6 User 84','84 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_84@k6test.local','$2b$10$pumFvh9wYaX7h/TfbdXXx.DEcyKrnkJFuuuMfELWslvFmJ00yWm8C','PP','REEL_3','Type 2',NULL,NULL),(311,'TT1','10000085','F','M',0,'K6 User 85','85 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_85@k6test.local','$2b$10$I.At4Vp7MQOXql5bgh.tjOaxR6WMMVxG549N4xENIU.QNmNa9GuEe','PP','REEL_3','Type 2',NULL,NULL),(312,'TT1','10000086','F','M',0,'K6 User 86','86 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_86@k6test.local','$2b$10$xkxlRznxXWAyqdskxvFXE.j762BqtW1exw4X4i5g98yF5GwGSELae','PP','REEL_3','Type 2',NULL,NULL),(313,'TT1','10000087','F','M',0,'K6 User 87','87 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_87@k6test.local','$2b$10$Q9cWaPdbua6lLnHkBpC18eVxRhaI36Bkhhd9H2HrjMLtH2DIg7mzG','PP','REEL_3','Type 2',NULL,NULL),(314,'TT1','10000088','F','M',0,'K6 User 88','88 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_88@k6test.local','$2b$10$RN1WPIfeIGROTwyxqs0r2envW4s2/vXzTFUxY/VNod5EQJF.ukb0K','PP','REEL_3','Type 2',NULL,NULL),(315,'TT1','10000089','F','M',0,'K6 User 89','89 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_89@k6test.local','$2b$10$0LmUjW4NjYZckI2zmgbarebLmRRJqu9kIGYMRl1PIrUG3UciWOfjO','PP','REEL_3','Type 2',NULL,NULL),(316,'TT1','10000090','F','M',0,'K6 User 90','90 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_90@k6test.local','$2b$10$uvVEig9MNSaEqSSdihbjNeu8qZZH5kUC0tnRoIQ7JbxOSB7m9Fxcu','PP','REEL_3','Type 2',NULL,NULL),(317,'TT1','10000091','F','M',0,'K6 User 91','91 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_91@k6test.local','$2b$10$7wXwvI42Cfn49Q/Z0UE/FO76VW10WmGhBLEAmiwyqq2vQem66xbbW','PP','REEL_3','Type 2',NULL,NULL),(318,'TT1','10000092','F','M',0,'K6 User 92','92 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_92@k6test.local','$2b$10$5zh/Xb4dddoQdwNsxUWPeO9ur3kFkPaFS2t21UGhAqk.YKDr2HhMe','PP','REEL_3','Type 2',NULL,NULL),(319,'TT1','10000093','F','M',0,'K6 User 93','93 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_93@k6test.local','$2b$10$NqvWzlu0D5CnkjVBJ/ae1.ukD4V4cs6puOfZaXU7LPnBeqLuFtLee','PP','REEL_3','Type 2',NULL,NULL),(320,'TT1','10000094','F','M',0,'K6 User 94','94 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_94@k6test.local','$2b$10$nE9f0A8I7JIMhceYmb4JYughM0YHACzjIp7A8pNw6D6voVvv2HGha','PP','REEL_3','Type 2',NULL,NULL),(321,'TT1','10000095','F','M',0,'K6 User 95','95 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_95@k6test.local','$2b$10$7GqgOrysTzF0XgpVO9ugUODCkUR/Xk.rtBRaP9A8lprVA5UzI53Q.','PP','REEL_3','Type 2',NULL,NULL),(322,'TT1','10000096','F','M',0,'K6 User 96','96 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_96@k6test.local','$2b$10$wfSU0oRA72yHaoxbBRSdpOMBgp4KUNKUKbsdjCNm2MNcN.3KULsUK','PP','REEL_3','Type 2',NULL,NULL),(323,'TT1','10000097','F','M',0,'K6 User 97','97 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_97@k6test.local','$2b$10$0LeBHqH98ya/e7.nx9kaDOq2SD8QefWQA8x9t9rV798sPEiOtSl3C','PP','REEL_3','Type 2',NULL,NULL),(324,'TT1','10000098','F','M',0,'K6 User 98','98 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_98@k6test.local','$2b$10$En2rixg0wqqJ6ibFk9m1bOlA6VHfdSOxUxC5nESoI/osl5/2Gw4Ua','PP','REEL_3','Type 2',NULL,NULL),(325,'TT1','10000099','F','M',0,'K6 User 99','99 Test Street, Tunis',1000,'Test activity','2030-01-01','k6_user_99@k6test.local','$2b$10$V3AgTi7Emm7JtkwHyyqF7.veIzduFPLRo62iL1UF.SlZQ8uVASSDi','PP','REEL_3','Type 2',NULL,NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `declarations`
--

DROP TABLE IF EXISTS `declarations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declarations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `client_id` int NOT NULL,
  `reporttva` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_declarations_client_date` (`client_id`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=1415 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declarations`
--

LOCK TABLES `declarations` WRITE;
/*!40000 ALTER TABLE `declarations` DISABLE KEYS */;
INSERT INTO `declarations` VALUES (1,'2222-02-01',1,NULL),(2,'2222-02-01',2,NULL),(3,'1111-01-01',1,NULL),(4,'2003-03-01',1,NULL),(5,'2003-03-01',3,NULL),(6,'2033-03-01',3,NULL),(7,'2004-04-01',4,NULL),(8,'2333-03-01',3,333),(9,'2013-03-01',3,0),(10,'2026-04-01',3,0),(11,'2323-06-01',3,0),(12,'2009-09-01',6,99),(13,'2026-05-01',3,555),(14,'2027-05-01',3,0),(15,'2025-01-01',7,0),(16,'2025-02-01',7,0),(18,'2026-02-01',7,NULL),(19,'2026-03-01',7,NULL),(22,'2026-01-01',7,100),(23,'2020-01-01',7,100),(24,'2026-07-01',7,NULL),(25,'2026-08-01',7,NULL),(37,'2026-07-01',17,NULL),(40,'2024-01-01',25,NULL),(1364,'2020-01-01',226,100),(1365,'2020-01-01',228,100),(1366,'2020-01-01',227,100),(1367,'2020-01-01',229,100),(1368,'2020-01-01',230,100),(1369,'2020-01-01',234,100),(1370,'2020-01-01',233,100),(1371,'2020-01-01',232,100),(1372,'2020-01-01',235,100),(1373,'2020-01-01',236,100),(1374,'2020-01-01',237,100),(1375,'2020-01-01',239,100),(1376,'2020-01-01',238,100),(1377,'2020-01-01',240,100),(1378,'2020-01-01',241,100),(1379,'2020-01-01',242,100),(1380,'2020-01-01',243,100),(1381,'2020-01-01',244,100),(1382,'2020-01-01',247,100),(1383,'2020-01-01',246,100),(1384,'2020-01-01',248,100),(1385,'2020-01-01',231,100),(1386,'2020-01-01',249,100),(1387,'2020-01-01',250,100),(1388,'2020-01-01',251,100),(1389,'2020-01-01',252,100),(1390,'2020-01-01',245,100),(1391,'2020-01-01',254,100),(1392,'2020-01-01',255,100),(1393,'2020-01-01',256,100),(1394,'2020-01-01',253,100),(1395,'2020-01-01',258,100),(1396,'2020-01-01',259,100),(1397,'2020-01-01',260,100),(1398,'2020-01-01',261,100),(1399,'2020-01-01',263,100),(1400,'2020-01-01',264,100),(1401,'2020-01-01',257,100),(1402,'2020-01-01',262,100),(1403,'2020-01-01',267,100),(1404,'2020-01-01',266,100),(1405,'2020-01-01',265,100),(1406,'2020-01-01',268,100),(1407,'2020-01-01',269,100),(1408,'2020-01-01',270,100),(1409,'2020-01-01',271,100),(1410,'2020-01-01',272,100),(1411,'2020-01-01',274,100),(1412,'2020-01-01',275,100),(1413,'2020-01-01',273,100),(1414,'2020-05-01',7,NULL);
/*!40000 ALTER TABLE `declarations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factures`
--

DROP TABLE IF EXISTS `factures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ref` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ht` double NOT NULL DEFAULT '-1',
  `tva` double NOT NULL DEFAULT '-1',
  `timber` double NOT NULL,
  `ttc` double NOT NULL DEFAULT '-1',
  `ttc_vente` double DEFAULT NULL,
  `nature_beneficiaire` varchar(2) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `regime_beneficiaire` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `montant_retenue_calcule` decimal(10,3) DEFAULT NULL,
  `ht_vente` double NOT NULL,
  `tva_vente` double NOT NULL,
  `ht_chat` double NOT NULL,
  `tva_achat` double NOT NULL,
  `decla_id` int NOT NULL,
  `client_id` int NOT NULL DEFAULT '0',
  `type_achat_vente` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `fodec` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mtfodec` double NOT NULL DEFAULT '-1',
  `tauxdc` double NOT NULL DEFAULT '-1',
  `mtdc` double NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `idx_factures_decla_client` (`decla_id`,`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1755596 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures`
--

LOCK TABLES `factures` WRITE;
/*!40000 ALTER TABLE `factures` DISABLE KEYS */;
INSERT INTO `factures` VALUES (1,'2025-12-30','Facture d\'achat','tnb ',442,7,2,474.94,0,NULL,NULL,NULL,0,0,442,30.94,1,1,'','',-1,-1,-1),(2,'2026-02-13','Facture de vente','2',2,13,2,4.26,4.26,NULL,NULL,NULL,2,0.26,0,0,2,2,'','',-1,-1,-1),(3,'2026-02-04','Facture de vente','1',11,13,1,13.43,13.43,NULL,NULL,NULL,11,1.43,0,0,3,1,'','',-1,-1,-1),(4,'2026-02-18','Facture d\'achat','gh',3333,13,3,3769.29,0,NULL,NULL,NULL,0,0,3333,433.29,5,3,'','',-1,-1,-1),(5,'2026-04-03','Facture d\'achat','ttt',333,13,2,378.29,0,NULL,NULL,NULL,0,0,333,43.29,6,3,'','',-1,-1,-1),(6,'2026-04-04','Facture de vente','four',4444,7,4,4759.08,4759.08,NULL,NULL,NULL,4444,311.08,0,0,7,4,'','',-1,-1,-1),(7,'2026-05-05','Facture d\'achat','bad day',2109,13,2,13276.257,0,NULL,NULL,NULL,0,1252.9569000000001,2109,1527.1269,13,3,'Autres achats importés','Oui',21.09,456,9617.04),(8,'2026-05-27','Facture de vente','still bad',2906,19,9,3882.117,3882.117,NULL,NULL,NULL,2906,618.3968000000001,0,0,13,3,'Autres achats locaux','Non',0,12,348.72),(9,'2026-05-14','Facture de vente','5467ygh',456789,19,5,369579305.909,369579305.909,NULL,NULL,NULL,456789,59008459.80900001,0,0,14,3,'Achat d’équipement local','Non',0,67890,310114052.1),(12,'2026-05-17','Facture d\'achat','',1500,7,1,1638.1,0,NULL,NULL,NULL,0,2.1,1500,107.1,15,7,'Achat d’équipement local','Oui',15,1,15),(13,'2026-05-18','Facture d\'achat','',10000,19,1,12139,0,NULL,NULL,NULL,0,38,10000,1938,15,7,'Achat d’équipement importé','Oui',100,1,100),(14,'2026-05-20','Facture de vente','',2500,19,1,3035.5,3035.5,NULL,NULL,NULL,2500,484.5,0,0,15,7,'Autres achats importés','Oui',25,1,25),(15,'2026-05-19','Facture d\'achat','',1000,13,1,1153.6,0,NULL,NULL,NULL,0,2.6,1000,132.6,15,7,'Autres achats locaux','Oui',10,1,10),(16,'2026-05-19','Facture de vente','',100000,19,1,121381,121381,NULL,NULL,NULL,100000,19380,0,0,15,7,'Autres achats locaux','Oui',1000,1,1000),(39,'2026-07-21','Facture d\'achat','',8502.102,19,1,10320.851,0,'PM','IS_20',103.209,0,0,8502.102,1647.7073600000003,24,7,'Achat d’équipement local','Oui',85.021,1,85.021),(40,'2026-06-30','Facture d\'achat','',857.983,19,1,1022,0,'PM','IS_20',150.000,0,0,857.983,163.01677,25,7,'Achat d’équipement local','Non',0,0,0),(42,'2026-07-03','Facture de vente','',10004.281,19,1,12620.4,12620.4,NULL,NULL,NULL,10004.281,2014.86222,0,0,22,7,'Achat d’équipement local','Oui',100.043,5,500.214),(44,'2026-07-03','Facture d\'achat','',2000,13,1,2306.2,0,'PM','IS_10',11.531,0,0,2000,265.2,22,7,'Achat d’équipement importé','Oui',20,1,20),(45,'2026-07-15','Facture d\'achat','',3000,19,1,3571,0,'PM','IS_20',35.710,0,0,3000,570,22,7,'Autres achats locaux','Non',0,0,0),(46,'2026-07-22','Facture d\'achat','',1089.109,19,0.5,1309.5,0,'PM','IS_35',19.642,0,0,1089.109,209,22,7,'Autres achats importés','Non',0,1,10.891),(52,'2026-07-04','Facture de vente','',10004.281,19,1,12620.4,12620.4,NULL,NULL,NULL,10004.281,2014.86222,0,0,23,7,'Achat d’équipement local','Oui',100.043,5,500.214),(53,'2026-07-15','Facture d\'achat','',1000,7,1,1081.7,0,'PP','REEL_3',16.226,0,0,1000,70.7,23,7,'Achat d’équipement local','Oui',10,0,0),(54,'2026-07-14','Facture d\'achat','',2000,13,1,2306.2,0,'PM','IS_10',11.531,0,0,2000,265.2,23,7,'Achat d’équipement importé','Oui',20,1,20),(55,'2026-07-22','Facture d\'achat','',3000,19,1,3571,0,'PM','IS_20',35.710,0,0,3000,570,23,7,'Autres achats locaux','Non',0,0,0),(56,'2026-07-23','Facture d\'achat','',1089.109,19,0.5,1309.5,0,'PM','IS_35',19.642,0,0,1089.109,209,23,7,'Autres achats importés','Non',0,1,10.891),(57,'2026-07-04','Facture d\'achat','',1000,7,1,1081.7,0,'PP','REEL_3',16.226,0,0,1000,70.7,22,7,'Achat d’équipement local','Oui',10,0,0),(63,'2026-07-01','Facture de vente','\'; DROP TABLE accounts; --',1000,19,1,1191,1191,NULL,NULL,NULL,1000,190,0,0,37,17,'Autres achats locaux','',0,0,0),(66,'2024-01-15','Facture de vente','FACT-001',10000,19,200,11900,11900,NULL,NULL,NULL,10000,1928.5,0,0,40,25,'Ventes locales','Oui',100,1,50),(1755595,'2026-07-17','Facture d\'achat','',1500,19,1,1982.35,0,'PM','IS_20',19.823,0,0,1500,316.35,1414,7,'Achat d’équipement local','Oui',15,10,150);
/*!40000 ALTER TABLE `factures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paie`
--

DROP TABLE IF EXISTS `paie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `salarier` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `famille` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num_kids` int NOT NULL,
  `brut` double NOT NULL DEFAULT '-1',
  `net` double NOT NULL DEFAULT '-1',
  `irpp_a` double NOT NULL,
  `irpp_m` double NOT NULL,
  `css` double NOT NULL,
  `decla_id` int NOT NULL,
  `client_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_paie_decla_client` (`decla_id`,`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=438140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paie`
--

LOCK TABLES `paie` WRITE;
/*!40000 ALTER TABLE `paie` DISABLE KEYS */;
INSERT INTO `paie` VALUES (1,'12','Oui',4,788,683.9781034666667,297.988992,24.832416,2.911080533333333,1,1),(2,'123','Oui',2,22,19.7809832,0,0,0.0894168,2,2),(3,'df','Non',0,2222,1674.8027280000001,3874.87744,322.90645333333333,9.201218666666668,4,1),(4,'gh','Oui',3,3333,2378.6431239999997,7413.047775999999,617.7539813333333,13.968494666666667,5,3),(5,'mokhtar','Oui',3,3333,2361.8931239999997,7611.047775999999,634.2539813333333,14.218494666666667,6,3),(6,'mmmm','Oui',3,8999,5528.015262666666,30723.90464,2560.325386666667,39.55615066666667,13,3),(7,'akram','Oui',0,1520,1210.0000453333337,1881.7328000000007,156.81106666666673,6.052888000000002,15,7),(8,'akram','Oui',1,1650,1302.5940733333332,2173.7560000000003,181.14633333333336,6.539593333333333,15,7),(9,'akram','Non',0,1500,1189.7067333333332,1907.9599999999996,158.99666666666664,6.0966,16,7),(19,'Alice','Oui',2,3000,2175.8423333333335,6255.015999999999,521.2513333333333,12.506333333333332,23,7),(20,'Bop','Non',0,2000,1534.1013333333335,3169.2000000000007,264.1000000000001,8.198666666666668,23,7),(21,'Charli','Oui',4,5000,3351.465,13716.96,1143.08,21.455000000000002,23,7),(22,'Diana','Oui',1,1500,1198.2067333333334,1807.9599999999996,150.6633333333333,5.929933333333333,23,7),(23,'akram','Oui',2,3000,2175.8423333333335,6255.015999999999,521.2513333333333,12.506333333333332,19,7),(25,'BoB','Non',0,2000,1534.1013333333335,3169.2000000000007,264.1000000000001,8.198666666666668,19,7),(26,'Charlie','Oui',4,5000,3351.465,13716.96,1143.08,21.455000000000002,19,7),(27,'Diana','Oui',1,1500,1198.2067333333334,1807.9599999999996,150.6633333333333,5.929933333333333,19,7),(37,'Jean Dupont','Oui',2,50000,27558.74166666667,208518,17376.5,224.75833333333333,40,25);
/*!40000 ALTER TABLE `paie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retenue`
--

DROP TABLE IF EXISTS `retenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retenue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ht` double NOT NULL DEFAULT '-1',
  `tva` double NOT NULL DEFAULT '-1',
  `ttc` double NOT NULL DEFAULT '-1',
  `tva_r` double NOT NULL,
  `retenue` double NOT NULL,
  `decla_id` int NOT NULL,
  `client_id` int NOT NULL DEFAULT '0',
  `nature_beneficiaire` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `regime_fiscal` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_retenue_decla_client` (`decla_id`,`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=438136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retenue`
--

LOCK TABLES `retenue` WRITE;
/*!40000 ALTER TABLE `retenue` DISABLE KEYS */;
INSERT INTO `retenue` VALUES (1,'Type 2',3456,13,3905.28,449.2800000000002,585.792,1,1,NULL,NULL),(2,'Type 1',1.869,7,2,0.131,0.3,2,2,NULL,NULL),(3,'Type 2',3333,7,3766.29,433.28999999999996,564.9435,5,3,NULL,NULL),(4,'Type 1',333,19,396.27,63.26999999999998,59.44049999999999,5,3,NULL,NULL),(5,'Type 1',333,13,376.29,43.29000000000002,56.4435,6,3,NULL,NULL),(6,'Type 2',222,13,250.86,28.860000000000014,37.629,13,3,NULL,NULL),(12,'Type 2',450,19,535.5,85.5,53.550000000000004,15,7,'PP','FORFAITAIRE'),(13,'Type 2',1000,13,1130,130,113,15,7,'PP','FORFAITAIRE'),(14,'Type 2',50,19,59.5,9.5,1.785,15,7,'PM',NULL),(15,'Type 2',4520,7,4836.4,316.39999999999964,145.09199999999998,15,7,'PP','REEL'),(19,'Type 1',500,7,535,35,80.25,18,7,'PM',NULL),(20,'Type 2',1000,13,1130,130,113,18,7,'PP','FORFAITAIRE'),(21,'Type 2',1000,19,1190,190,35.699999999999996,18,7,'PM',NULL),(22,'Type 2',1000,7,1070,70,32.1,18,7,'PP','REEL'),(23,'Type 2',1000,13,1130,130,113,23,7,'PP','FORFAITAIRE'),(24,'Type 1',500,7,535,35,80.25,23,7,NULL,NULL),(25,'Type 2',1000,19,1190,190,35.699999999999996,23,7,'PM',NULL),(26,'Type 2',1000,7,1070,70,32.1,23,7,'PP','REEL'),(33,'Type 1',100000,19,119000,19000,17850,40,25,'PP','FORFAITAIRE');
/*!40000 ALTER TABLE `retenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summary`
--

DROP TABLE IF EXISTS `summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ttrs` double DEFAULT NULL,
  `tfp` float NOT NULL,
  `foprolos` float NOT NULL,
  `droit` double NOT NULL,
  `tva` float NOT NULL,
  `dtf` float NOT NULL,
  `tcl` float NOT NULL,
  `ttdec` float NOT NULL,
  `dec_id` int NOT NULL,
  `client_id` int NOT NULL,
  `fodec` double NOT NULL DEFAULT '-1',
  `reporttva` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_summary_dec_client` (`dec_id`,`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1409 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary`
--

LOCK TABLES `summary` WRITE;
/*!40000 ALTER TABLE `summary` DISABLE KEYS */;
INSERT INTO `summary` VALUES (1,'2222-02-01',0.30000001192092896,0.44,0.22,0,0.129,2,0.00852,3.09752,2,2,-1,NULL),(2,'1111-01-01',0,0,0,0,1.43,1,0.02686,2.45686,3,1,-1,NULL),(3,'2003-03-01',0,22.22,22.22,0,0,0,0,44.44,4,1,-1,NULL),(4,'2003-03-01',624.3839721679688,33.33,33.33,0,0,3,0,694.044,5,3,-1,NULL),(5,'2033-03-01',56.44350051879883,33.33,33.33,0,0,2,0,125.104,6,3,-1,NULL),(6,'2004-04-01',0,0,0,0,311.08,4,9.51816,324.598,7,4,-1,NULL),(7,'2026-05-01',3965.139892578125,179.98,89.99,348.72,0,9,7.76423,4600.59,13,3,0,555),(8,'2027-05-01',0,0,0,310114052.1,59008500,5,739159,369862000,14,3,0,0),(9,'2025-01-01',738.6300048828125,48.2,31.7,1025,17188.1,2,248.833,20307.5,15,7,1025,0),(10,'2025-02-01',165.09326171875,30,15,0,0,0,0,210.093,16,7,0,0),(12,'2026-02-01',261.04998779296875,0,0,0,0,0,0,261.05,18,7,0,NULL),(13,'2026-03-01',2127.185,115,115,0,0,0,0,2357.19,19,7,0,NULL),(16,'2026-01-01',83.109,0,0,500.214,799.962,1,25.2408,1509.57,22,7,100.043,100),(17,'2020-01-01',2471.344,115,115,500.214,374.962,1,25.2408,3702.8,23,7,100.043,100),(18,'2026-07-01',103.209,0,0,0,0,0,0,103.209,24,7,0,NULL),(19,'2026-08-01',150,0,0,0,0,0,0,15.33,25,7,0,NULL),(31,'2026-07-01',0,0,0,0,190,1,2.382,193.382,37,17,0,NULL),(34,'2024-01-01',35451.258,1000,500,50,0,200,23.8,37325.1,40,25,100,NULL),(1358,'2020-01-01',0,0,0,0,0,0,0,0,1364,226,0,100),(1359,'2020-01-01',0,0,0,0,0,0,0,0,1365,228,0,100),(1360,'2020-01-01',0,0,0,0,0,0,0,0,1366,227,0,100),(1361,'2020-01-01',0,0,0,0,0,0,0,0,1367,229,0,100),(1362,'2020-01-01',0,0,0,0,0,0,0,0,1368,230,0,100),(1363,'2020-01-01',0,0,0,0,0,0,0,0,1369,234,0,100),(1364,'2020-01-01',0,0,0,0,0,0,0,0,1370,233,0,100),(1365,'2020-01-01',0,0,0,0,0,0,0,0,1371,232,0,100),(1366,'2020-01-01',0,0,0,0,0,0,0,0,1372,235,0,100),(1367,'2020-01-01',0,0,0,0,0,0,0,0,1373,236,0,100),(1368,'2020-01-01',0,0,0,0,0,0,0,0,1374,237,0,100),(1369,'2020-01-01',0,0,0,0,0,0,0,0,1375,239,0,100),(1370,'2020-01-01',0,0,0,0,0,0,0,0,1376,238,0,100),(1371,'2020-01-01',0,0,0,0,0,0,0,0,1377,240,0,100),(1372,'2020-01-01',0,0,0,0,0,0,0,0,1378,241,0,100),(1373,'2020-01-01',0,0,0,0,0,0,0,0,1379,242,0,100),(1374,'2020-01-01',0,0,0,0,0,0,0,0,1380,243,0,100),(1375,'2020-01-01',0,0,0,0,0,0,0,0,1381,244,0,100),(1376,'2020-01-01',0,0,0,0,0,0,0,0,1382,247,0,100),(1377,'2020-01-01',0,0,0,0,0,0,0,0,1383,246,0,100),(1378,'2020-01-01',0,0,0,0,0,0,0,0,1384,248,0,100),(1379,'2020-01-01',0,0,0,0,0,0,0,0,1385,231,0,100),(1380,'2020-01-01',0,0,0,0,0,0,0,0,1386,249,0,100),(1381,'2020-01-01',0,0,0,0,0,0,0,0,1387,250,0,100),(1382,'2020-01-01',0,0,0,0,0,0,0,0,1388,251,0,100),(1383,'2020-01-01',0,0,0,0,0,0,0,0,1389,252,0,100),(1384,'2020-01-01',0,0,0,0,0,0,0,0,1390,245,0,100),(1385,'2020-01-01',0,0,0,0,0,0,0,0,1391,254,0,100),(1386,'2020-01-01',0,0,0,0,0,0,0,0,1392,255,0,100),(1387,'2020-01-01',0,0,0,0,0,0,0,0,1393,256,0,100),(1388,'2020-01-01',0,0,0,0,0,0,0,0,1394,253,0,100),(1389,'2020-01-01',0,0,0,0,0,0,0,0,1395,258,0,100),(1390,'2020-01-01',0,0,0,0,0,0,0,0,1396,259,0,100),(1391,'2020-01-01',0,0,0,0,0,0,0,0,1397,260,0,100),(1392,'2020-01-01',0,0,0,0,0,0,0,0,1398,261,0,100),(1393,'2020-01-01',0,0,0,0,0,0,0,0,1399,263,0,100),(1394,'2020-01-01',0,0,0,0,0,0,0,0,1400,264,0,100),(1395,'2020-01-01',0,0,0,0,0,0,0,0,1401,257,0,100),(1396,'2020-01-01',0,0,0,0,0,0,0,0,1402,262,0,100),(1397,'2020-01-01',0,0,0,0,0,0,0,0,1403,267,0,100),(1398,'2020-01-01',0,0,0,0,0,0,0,0,1404,266,0,100),(1399,'2020-01-01',0,0,0,0,0,0,0,0,1405,265,0,100),(1400,'2020-01-01',0,0,0,0,0,0,0,0,1406,268,0,100),(1401,'2020-01-01',0,0,0,0,0,0,0,0,1407,269,0,100),(1402,'2020-01-01',0,0,0,0,0,0,0,0,1408,270,0,100),(1403,'2020-01-01',0,0,0,0,0,0,0,0,1409,271,0,100),(1404,'2020-01-01',0,0,0,0,0,0,0,0,1410,272,0,100),(1405,'2020-01-01',0,0,0,0,0,0,0,0,1411,274,0,100),(1406,'2020-01-01',0,0,0,0,0,0,0,0,1412,275,0,100),(1407,'2020-01-01',0,0,0,0,0,0,0,0,1413,273,0,100),(1408,'2020-05-01',19.823,0,0,0,0,0,0,19.823,1414,7,0,NULL);
/*!40000 ALTER TABLE `summary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-12 19:54:05
