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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'1','1','1','1',1,'1','1',1,'1','2001-11-11','1@1.1','$2a$08$jrRJUg3NioBP5ij43Mb8beNmiX3UEc85QFoXbUQ9VCZHImfE0Y4ha','','',NULL,NULL,NULL),(2,'2','2','2','2',2,'2','2',2,'2','2002-02-02','2@2.2','$2a$08$tkSDSy0Vyw41vodMr/0dq.MzIK8p8mZPSEeK7Yx2ywYN7ChuNPcea','','',NULL,NULL,NULL),(3,'3','3','3','3',3,'3','3',3,'3','2003-03-13','3@3.3','$2a$08$Yb6zL7OToHF31ggkJ24r8ulXLNtWmzaiGgQPKslG2ThT/z.esijYK','','',NULL,NULL,NULL),(4,'4','4','4','4',4,'4','4',4,'4','2004-04-04','4@4.4','$2a$08$27Tnxm4NMT1LYy9CqhsJe.Qch.lxlmpoEJwMqFHyQFRUI5olXO9eq','','',NULL,NULL,NULL),(5,'5','5','5','5',5,'5','5',5,'5','2005-05-05','5@5.5','$2a$12$h7.hmpvkSic5PfCjw/GYw.8TD5M2ZfECvaT5W6HoTHKFFtBPa7Q/i','','',NULL,NULL,NULL),(6,'9','9','9','9',9,'9','9',9,'9','2009-09-09','9@9.9','$2a$12$LnfEQEevxh4sgk7z4e.4QuzNTeb8oxdKTo/yZFRUOjTaTj03TH0hS','','',NULL,NULL,NULL),(7,'TT1','1234567','F','M',110,'Akram MORHAG','Rades Meliane Residence Maxula B01',2040,'test','2026-02-28','akrammorhag@gmail.com','$2a$12$mIJbvZOaLQp3KegfmOmcTebv3OJIIdKe5Fk/FMqxKIICMaxaJrRP2','PP','REEL_3','Type 1','6e421ead1eeb049ae1f2554a0e3222a52753ca70b3e9f5cb2a3d2c8c48908ed6',1783283646657),(10,'7','7','44','test',2,'Master de recherche en finance','Rades Méliane résidence maxula 2 B 01',2040,'777','1995-02-26','akrammorhag1@gmail.com','$2a$12$p1Al9fIaUebuhC.3dIQTMuxnFwZj2s8S53WS4JDT77a88vUQHsgMS','PM','IS_10','Type 1',NULL,NULL),(12,'5555','1234567','F','T',0,'Morhag','Sedouikech Djerba BP118',4145,'777','2001-02-26','akrammorhag111@gmail.com','$2a$12$R/ZEwMi04IqeFugaLk6kNubDX3JRPhPgI8X8PognmVoWy77508SZO','PM','IS_20','Type 1',NULL,NULL),(14,'037','1234567','D','G',0,'man','3576  Farland Avenue',7814,'fff','2012-02-28','akrammorhag11@gmail.com','$2a$12$H/J9ZPkU0R.0Keyx7ZZ19uBcvyftLK3PJK3oFhetagzfVdeErQju6','PM','IS_20','Type 1',NULL,NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declarations`
--

LOCK TABLES `declarations` WRITE;
/*!40000 ALTER TABLE `declarations` DISABLE KEYS */;
INSERT INTO `declarations` VALUES (1,'2222-02-01',1,NULL),(2,'2222-02-01',2,NULL),(3,'1111-01-01',1,NULL),(4,'2003-03-01',1,NULL),(5,'2003-03-01',3,NULL),(6,'2033-03-01',3,NULL),(7,'2004-04-01',4,NULL),(8,'2333-03-01',3,333),(9,'2013-03-01',3,0),(10,'2026-04-01',3,0),(11,'2323-06-01',3,0),(12,'2009-09-01',6,99),(13,'2026-05-01',3,555),(14,'2027-05-01',3,0),(15,'2025-01-01',7,0),(16,'2025-02-01',7,0),(18,'2026-02-01',7,NULL),(19,'2026-03-01',7,NULL),(22,'2026-01-01',7,100),(23,'2020-01-01',7,100),(24,'2026-07-01',7,NULL),(25,'2026-08-01',7,NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures`
--

LOCK TABLES `factures` WRITE;
/*!40000 ALTER TABLE `factures` DISABLE KEYS */;
INSERT INTO `factures` VALUES (1,'2025-12-30','Facture d\'achat','tnb ',442,7,2,474.94,0,NULL,NULL,NULL,0,0,442,30.94,1,1,'','',-1,-1,-1),(2,'2026-02-13','Facture de vente','2',2,13,2,4.26,4.26,NULL,NULL,NULL,2,0.26,0,0,2,2,'','',-1,-1,-1),(3,'2026-02-04','Facture de vente','1',11,13,1,13.43,13.43,NULL,NULL,NULL,11,1.43,0,0,3,1,'','',-1,-1,-1),(4,'2026-02-18','Facture d\'achat','gh',3333,13,3,3769.29,0,NULL,NULL,NULL,0,0,3333,433.29,5,3,'','',-1,-1,-1),(5,'2026-04-03','Facture d\'achat','ttt',333,13,2,378.29,0,NULL,NULL,NULL,0,0,333,43.29,6,3,'','',-1,-1,-1),(6,'2026-04-04','Facture de vente','four',4444,7,4,4759.08,4759.08,NULL,NULL,NULL,4444,311.08,0,0,7,4,'','',-1,-1,-1),(7,'2026-05-05','Facture d\'achat','bad day',2109,13,2,13276.257,0,NULL,NULL,NULL,0,1252.9569000000001,2109,1527.1269,13,3,'Autres achats importés','Oui',21.09,456,9617.04),(8,'2026-05-27','Facture de vente','still bad',2906,19,9,3882.117,3882.117,NULL,NULL,NULL,2906,618.3968000000001,0,0,13,3,'Autres achats locaux','Non',0,12,348.72),(9,'2026-05-14','Facture de vente','5467ygh',456789,19,5,369579305.909,369579305.909,NULL,NULL,NULL,456789,59008459.80900001,0,0,14,3,'Achat d’équipement local','Non',0,67890,310114052.1),(12,'2026-05-17','Facture d\'achat','',1500,7,1,1638.1,0,NULL,NULL,NULL,0,2.1,1500,107.1,15,7,'Achat d’équipement local','Oui',15,1,15),(13,'2026-05-18','Facture d\'achat','',10000,19,1,12139,0,NULL,NULL,NULL,0,38,10000,1938,15,7,'Achat d’équipement importé','Oui',100,1,100),(14,'2026-05-20','Facture de vente','',2500,19,1,3035.5,3035.5,NULL,NULL,NULL,2500,484.5,0,0,15,7,'Autres achats importés','Oui',25,1,25),(15,'2026-05-19','Facture d\'achat','',1000,13,1,1153.6,0,NULL,NULL,NULL,0,2.6,1000,132.6,15,7,'Autres achats locaux','Oui',10,1,10),(16,'2026-05-19','Facture de vente','',100000,19,1,121381,121381,NULL,NULL,NULL,100000,19380,0,0,15,7,'Autres achats locaux','Oui',1000,1,1000),(39,'2026-07-21','Facture d\'achat','',8502.002,19,1,10320.73,0,'PM','IS_20',103.207,0,0,8502.002,1647.6879800000002,24,7,'Achat d’équipement local','Oui',85.02,1,85.02),(40,'2026-06-30','Facture d\'achat','',857.983,19,1,1022,0,'PM','IS_20',150.000,0,0,857.983,163.01677,25,7,'Achat d’équipement local','Non',0,0,0),(42,'2026-07-03','Facture de vente','',10004.281,19,1,12620.4,12620.4,NULL,NULL,NULL,10004.281,2014.86222,0,0,22,7,'Achat d’équipement local','Oui',100.043,5,500.214),(44,'2026-07-03','Facture d\'achat','',2000,13,1,2306.2,0,'PM','IS_10',11.531,0,0,2000,265.2,22,7,'Achat d’équipement importé','Oui',20,1,20),(45,'2026-07-15','Facture d\'achat','',3000,19,1,3571,0,'PM','IS_20',35.710,0,0,3000,570,22,7,'Autres achats locaux','Non',0,0,0),(46,'2026-07-22','Facture d\'achat','',1089.109,19,0.5,1309.5,0,'PM','IS_35',19.642,0,0,1089.109,209,22,7,'Autres achats importés','Non',0,1,10.891),(52,'2026-07-04','Facture de vente','',10004.281,19,1,12620.4,12620.4,NULL,NULL,NULL,10004.281,2014.86222,0,0,23,7,'Achat d’équipement local','Oui',100.043,5,500.214),(53,'2026-07-15','Facture d\'achat','',1000,7,1,1081.7,0,'PP','REEL_3',16.226,0,0,1000,70.7,23,7,'Achat d’équipement local','Oui',10,0,0),(54,'2026-07-14','Facture d\'achat','',2000,13,1,2306.2,0,'PM','IS_10',11.531,0,0,2000,265.2,23,7,'Achat d’équipement importé','Oui',20,1,20),(55,'2026-07-22','Facture d\'achat','',3000,19,1,3571,0,'PM','IS_20',35.710,0,0,3000,570,23,7,'Autres achats locaux','Non',0,0,0),(56,'2026-07-23','Facture d\'achat','',1089.109,19,0.5,1309.5,0,'PM','IS_35',19.642,0,0,1089.109,209,23,7,'Autres achats importés','Non',0,1,10.891),(57,'2026-07-04','Facture d\'achat','',1000,7,1,1081.7,0,'PP','REEL_3',16.226,0,0,1000,70.7,22,7,'Achat d’équipement local','Oui',10,0,0);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paie`
--

LOCK TABLES `paie` WRITE;
/*!40000 ALTER TABLE `paie` DISABLE KEYS */;
INSERT INTO `paie` VALUES (1,'12','Oui',4,788,683.9781034666667,297.988992,24.832416,2.911080533333333,1,1),(2,'123','Oui',2,22,19.7809832,0,0,0.0894168,2,2),(3,'df','Non',0,2222,1674.8027280000001,3874.87744,322.90645333333333,9.201218666666668,4,1),(4,'gh','Oui',3,3333,2378.6431239999997,7413.047775999999,617.7539813333333,13.968494666666667,5,3),(5,'mokhtar','Oui',3,3333,2361.8931239999997,7611.047775999999,634.2539813333333,14.218494666666667,6,3),(6,'mmmm','Oui',3,8999,5528.015262666666,30723.90464,2560.325386666667,39.55615066666667,13,3),(7,'akram','Oui',0,1520,1210.0000453333337,1881.7328000000007,156.81106666666673,6.052888000000002,15,7),(8,'akram','Oui',1,1650,1302.5940733333332,2173.7560000000003,181.14633333333336,6.539593333333333,15,7),(9,'akram','Non',0,1500,1189.7067333333332,1907.9599999999996,158.99666666666664,6.0966,16,7),(19,'Alice','Oui',2,3000,2175.8423333333335,6255.015999999999,521.2513333333333,12.506333333333332,23,7),(20,'Bop','Non',0,2000,1534.1013333333335,3169.2000000000007,264.1000000000001,8.198666666666668,23,7),(21,'Charli','Oui',4,5000,3351.465,13716.96,1143.08,21.455000000000002,23,7),(22,'Diana','Oui',1,1500,1198.2067333333334,1807.9599999999996,150.6633333333333,5.929933333333333,23,7),(23,'akram','Oui',2,3000,2175.8423333333335,6255.015999999999,521.2513333333333,12.506333333333332,19,7),(25,'BoB','Non',0,2000,1534.1013333333335,3169.2000000000007,264.1000000000001,8.198666666666668,19,7),(26,'Charlie','Oui',4,5000,3351.465,13716.96,1143.08,21.455000000000002,19,7),(27,'Diana','Oui',1,1500,1198.2067333333334,1807.9599999999996,150.6633333333333,5.929933333333333,19,7);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retenue`
--

LOCK TABLES `retenue` WRITE;
/*!40000 ALTER TABLE `retenue` DISABLE KEYS */;
INSERT INTO `retenue` VALUES (1,'Type 2',3456,13,3905.28,449.2800000000002,585.792,1,1,NULL,NULL),(2,'Type 1',1.869,7,2,0.131,0.3,2,2,NULL,NULL),(3,'Type 2',3333,7,3766.29,433.28999999999996,564.9435,5,3,NULL,NULL),(4,'Type 1',333,19,396.27,63.26999999999998,59.44049999999999,5,3,NULL,NULL),(5,'Type 1',333,13,376.29,43.29000000000002,56.4435,6,3,NULL,NULL),(6,'Type 2',222,13,250.86,28.860000000000014,37.629,13,3,NULL,NULL),(12,'Type 2',450,19,535.5,85.5,53.550000000000004,15,7,'PP','FORFAITAIRE'),(13,'Type 2',1000,13,1130,130,113,15,7,'PP','FORFAITAIRE'),(14,'Type 2',50,19,59.5,9.5,1.785,15,7,'PM',NULL),(15,'Type 2',4520,7,4836.4,316.39999999999964,145.09199999999998,15,7,'PP','REEL'),(19,'Type 1',500,7,535,35,80.25,18,7,'PM',NULL),(20,'Type 2',1000,13,1130,130,113,18,7,'PP','FORFAITAIRE'),(21,'Type 2',1000,19,1190,190,35.699999999999996,18,7,'PM',NULL),(22,'Type 2',1000,7,1070,70,32.1,18,7,'PP','REEL'),(23,'Type 2',1000,13,1130,130,113,23,7,'PP','FORFAITAIRE'),(24,'Type 1',500,7,535,35,80.25,23,7,NULL,NULL),(25,'Type 2',1000,19,1190,190,35.699999999999996,23,7,'PM',NULL),(26,'Type 2',1000,7,1070,70,32.1,23,7,'PP','REEL');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary`
--

LOCK TABLES `summary` WRITE;
/*!40000 ALTER TABLE `summary` DISABLE KEYS */;
INSERT INTO `summary` VALUES (1,'2222-02-01',0.30000001192092896,0.44,0.22,0,0.129,2,0.00852,3.09752,2,2,-1,NULL),(2,'1111-01-01',0,0,0,0,1.43,1,0.02686,2.45686,3,1,-1,NULL),(3,'2003-03-01',0,22.22,22.22,0,0,0,0,44.44,4,1,-1,NULL),(4,'2003-03-01',624.3839721679688,33.33,33.33,0,0,3,0,694.044,5,3,-1,NULL),(5,'2033-03-01',56.44350051879883,33.33,33.33,0,0,2,0,125.104,6,3,-1,NULL),(6,'2004-04-01',0,0,0,0,311.08,4,9.51816,324.598,7,4,-1,NULL),(7,'2026-05-01',3965.139892578125,179.98,89.99,348.72,0,9,7.76423,4600.59,13,3,0,555),(8,'2027-05-01',0,0,0,310114052.1,59008500,5,739159,369862000,14,3,0,0),(9,'2025-01-01',738.6300048828125,48.2,31.7,1025,17188.1,2,248.833,20307.5,15,7,1025,0),(10,'2025-02-01',165.09326171875,30,15,0,0,0,0,210.093,16,7,0,0),(12,'2026-02-01',261.04998779296875,0,0,0,0,0,0,261.05,18,7,0,NULL),(13,'2026-03-01',2127.1845703125,230,115,0,0,0,0,2472.19,19,7,0,NULL),(16,'2026-01-01',83.109,0,0,500.214,799.962,1,25.2408,1509.57,22,7,100.043,100),(17,'2020-01-01',2471.344,115,115,500.214,374.962,1,25.2408,3702.8,23,7,100.043,100),(18,'2026-07-01',103.207,0,0,0,0,0,0,103.207,24,7,0,NULL),(19,'2026-08-01',150,0,0,0,0,0,0,15.33,25,7,0,NULL);
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

-- Dump completed on 2026-07-05 21:12:56
