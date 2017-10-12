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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conteudo` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `autor_idLeitor` int(10) unsigned NOT NULL,
  `idAdmin_deleted` int(10) unsigned DEFAULT NULL,
  `subtitulo` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `src_imagem` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visualizacoes` bigint(20) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `publishedAt` date DEFAULT NULL,
  `tipo_post` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-09-23',NULL),(2,'Notícia Número 4','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-09-23',NULL),(11,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-04',NULL),(3,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-09-29',NULL),(10,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-09-30',NULL),(4,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-04',NULL),(5,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-05',NULL),(6,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-04',NULL),(7,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-04',NULL),(8,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-04',NULL),(9,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-05',NULL),(12,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-04',NULL),(13,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-05',NULL),(14,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-09-30',NULL),(15,'Notícia Número 1','Notícia conteudo um de teste',NULL,NULL,25,NULL,'subtitulo teste','../../../assets/img/banner4.png',NULL,NULL,'2017-10-03',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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
