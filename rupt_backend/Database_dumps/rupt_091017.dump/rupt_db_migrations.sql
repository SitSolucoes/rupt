CREATE DATABASE  IF NOT EXISTS `rupt_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `rupt_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: rupt_db
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_admins_table',1),(2,'2017_04_13_183441_addAtivoToAdmins',1),(3,'2017_04_21_173934_create_leitores_table',1),(4,'2017_05_01_142045_CreateSugestoes',1),(5,'2017_05_02_221540_createPosts',1),(6,'2017_05_02_221541_createMotivosDenuncia',1),(7,'2017_05_02_221550_createDenuncias',1),(8,'2017_05_09_231421_createEscritor',1),(9,'2017_05_10_000804_addColumnsToPosts',1),(10,'2017_05_13_154635_addColumnsToSugestao',1),(11,'2017_05_13_185232_setAdminNullablePostTable',1),(12,'2017_05_13_185529_alterColumnAdminIdDenuncias',1),(13,'2017_05_13_193705_alterColumnsPost',1),(14,'2017_05_15_235202_addAtivoToLeitores',1),(15,'2017_05_17_193500_addColumnAdminTable',1),(16,'2017_05_23_232620_addStatusToEscritores',1),(17,'2017_05_25_185755_createMensagensTable',1),(18,'2017_05_25_200848_AddColumnsToMensagensTable',1),(19,'2017_05_26_010720_AddColumnNomeToMensagensTable',1),(20,'2017_05_29_174433_addForeignsToMensagens',1),(21,'2017_06_09_013721_addTelefonesToLeitor',1),(22,'2017_06_13_232200_addMotRecusa',1),(23,'2017_06_13_233411_addAdminsToEscritores',1),(24,'2017_06_15_203312_telefoneNull',1),(25,'2017_06_17_143246_enderecosEscritores',1),(26,'2017_06_22_002542_bancoNullable',1),(27,'2017_06_26_081445_SetTokenToNullAdmin',1),(28,'2017_06_27_003309_addColumnStatusToSugestoes',1),(29,'2017_07_01_225815_escritorBiografiaNull',1),(30,'2017_07_02_155630_arrumaBiografia',1),(31,'2017_07_03_234912_sugestaoStatusString',1),(32,'2017_07_04_001628_categorias',1),(33,'2017_08_01_000231_pagamento',1),(34,'2017_08_05_152822_fixMasks',1),(35,'2017_08_07_005415_anexos',1),(36,'2017_08_13_152321_data_pagamento',2),(37,'2017_09_21_233127_alterLeitoresTable',2),(38,'2017_09_21_233559_alterLeitoresTableSrcFoto',3),(39,'2017_09_23_161315_alterTableLeitoresToken',4),(40,'2017_09_23_203438_createTableVisualizacoes',5),(41,'2017_09_23_204816_alterTablePostsDataPublicacao',6),(42,'2017_09_23_211630_alterTablePostsSrcImagelength',7),(43,'2017_09_23_212137_alterTablePostsVisualizacoesNullable',8),(44,'2017_09_23_212601_alterTablePostsDeletedAt',9);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-09 19:20:00
