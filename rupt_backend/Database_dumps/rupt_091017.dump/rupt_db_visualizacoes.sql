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
-- Table structure for table `visualizacoes`
--

DROP TABLE IF EXISTS `visualizacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visualizacoes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `leitor_idLeitor` int(10) unsigned DEFAULT NULL,
  `post_idPost` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visualizacoes`
--

LOCK TABLES `visualizacoes` WRITE;
/*!40000 ALTER TABLE `visualizacoes` DISABLE KEYS */;
INSERT INTO `visualizacoes` VALUES (1,24,1,'2017-09-23 03:00:00',NULL),(2,24,2,'2017-09-23 03:00:00',NULL),(3,24,3,'2017-09-23 03:00:00',NULL),(4,24,4,'2017-09-23 03:00:00',NULL),(5,24,6,'2017-09-23 03:00:00',NULL),(6,24,1,'2017-09-23 03:00:00',NULL),(7,24,2,'2017-09-23 03:00:00',NULL),(8,24,3,'2017-09-23 03:00:00',NULL),(9,24,4,'2017-09-23 03:00:00',NULL),(10,24,12,'2017-09-23 03:00:00',NULL),(11,24,14,'2017-09-23 03:00:00',NULL),(12,24,15,'2017-09-23 03:00:00',NULL),(13,24,16,'2017-09-23 03:00:00',NULL),(14,24,11,'2017-09-23 03:00:00',NULL),(15,24,11,'2017-09-23 03:00:00',NULL),(16,24,11,'2017-09-23 03:00:00',NULL),(19,24,5,'2017-09-23 03:00:00',NULL),(20,24,7,'2017-09-23 03:00:00',NULL),(21,24,13,'2017-09-23 03:00:00',NULL),(22,24,8,'2017-09-23 03:00:00',NULL),(23,24,6,'2017-09-23 03:00:00',NULL);
/*!40000 ALTER TABLE `visualizacoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-09 19:20:02