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
-- Table structure for table `mensagens`
--

DROP TABLE IF EXISTS `mensagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensagens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `assunto` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conteudo` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lida` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remetente` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin_idAdmin` int(10) unsigned DEFAULT NULL,
  `leitor_idLeitor` int(10) unsigned DEFAULT NULL,
  `mensagem_idMensagem` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mensagens_admin_idadmin_foreign` (`admin_idAdmin`),
  KEY `mensagens_leitor_idleitor_foreign` (`leitor_idLeitor`),
  KEY `mensagens_mensagem_idmensagem_foreign` (`mensagem_idMensagem`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens`
--

LOCK TABLES `mensagens` WRITE;
/*!40000 ALTER TABLE `mensagens` DISABLE KEYS */;
INSERT INTO `mensagens` VALUES (1,'a','mensagemnaolida',1,'2016-12-22 04:00:00','2017-07-01 08:35:30','gilberto1994@gmail.com','b gilberto',1,NULL,NULL),(2,'b','mensagemnaolida',1,'2016-12-23 04:00:00','2017-07-22 20:23:30','gilberto1994@gmail.com','agilberto',1,NULL,NULL),(3,'c','mensagemnaolida',1,'2016-12-24 04:00:00','2017-07-14 09:21:24','gilberto1994@gmail.com','cgilberto',1,NULL,NULL),(4,'d','mensagemnaolida',1,'2016-12-22 04:00:00','2017-07-22 21:57:51','gilberto1994@gmail.com','ogilberto',1,NULL,NULL),(5,'Resposta','respondendo',1,'2017-07-01 08:35:30','2017-07-01 08:35:30','gilberto1994@gmail.com','gilberto',1,NULL,1),(6,'Resposta','123456',0,'2017-07-14 09:21:25','2017-07-14 09:21:25','gilberto1994@gmail.com','99999999',NULL,1,NULL);
/*!40000 ALTER TABLE `mensagens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-09 19:19:58
