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
-- Table structure for table `leitores`
--

DROP TABLE IF EXISTS `leitores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leitores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nick` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexo` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nascimento` date NOT NULL,
  `src_foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL,
  `tokenLogin` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenExpira` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `leitores_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leitores`
--

LOCK TABLES `leitores` WRITE;
/*!40000 ALTER TABLE `leitores` DISABLE KEYS */;
INSERT INTO `leitores` VALUES (1,'gibasama','gibasama','M','1994-12-17','-1','gilberto1994@gmail.com','$2y$10$D7RljO5bAj9tR28R.O/ZauhD3ruWSrS76ILyLEc71dbzCbWyDCXOy',NULL,'2017-08-23 04:24:03','2017-08-23 04:24:03',1,'','0000-00-00'),(2,'gibasama','gibasama','M','1994-12-17','-1','gilberto1995@gmail.com','$2y$10$HQIMzcqvHjdhN8KeSFGDgOXRHbt45zehpJ1XlI43ZOCQH5RBeFea2',NULL,'2017-08-23 04:27:03','2017-08-23 04:27:03',1,'','0000-00-00'),(3,'teste','Teste','M','1970-01-01','-1','teste@teste.com.br','$2y$10$TiO8qyGHPEiXsqkkWHK5.OTgS8k.mWF0qhqYPNO8JpQedSeXoYi5G',NULL,'2017-09-12 03:05:14','2017-09-12 03:05:14',1,'','0000-00-00'),(4,'teste','Teste','M','1970-01-01','-1','testi@teste.com.br','$2y$10$03kNq.KExRFMiGZFDPxpJOR57goJSfKcwi658QuZxUV4xZO8/2zCS',NULL,'2017-09-12 03:05:54','2017-09-12 03:05:54',1,'','0000-00-00'),(5,'giba','gilberto','M','1994-12-19',NULL,'giba@g.com.br','$2y$10$4dBdt3FHvs6MyjznwqnsDeKrgr5YXn0CYwV3pqNvbRtBUHyE75pTm',NULL,'2017-09-22 02:39:10','2017-09-22 02:39:10',1,'','0000-00-00'),(6,'giba','gilberto','M','1994-12-19',NULL,'gibaa@g.com.br','$2y$10$jt8YcniRyVdz.aGB4pAkuOGXhAQYFK94QbA81s0txKFnuGC./tHyC',NULL,'2017-09-22 02:42:30','2017-09-22 02:42:30',1,'','0000-00-00'),(7,'giba','gilberto','M','1994-12-19',NULL,'gibsaa@g.com.br','$2y$10$mgiXcUIzijTm.xLj4Qv5NOLpkwN42rxH7W2H3wvx/hDr5U5Rv2mda',NULL,'2017-09-22 02:44:00','2017-09-22 02:44:00',1,'','0000-00-00'),(8,'giba','gilberto','M','1994-12-19',NULL,'gibsaaaa@g.com.br','$2y$10$AGk34FaGiM67AvJUvBmWJ.8wGoCiqHLMLqS/o0Lkh3sl5.6rYGE/q',NULL,'2017-09-22 02:44:11','2017-09-22 02:44:11',1,'','0000-00-00'),(9,'giba','gilberto','M','1994-12-19',NULL,'gilber@tosl.com.br','$2y$10$P2xlsis7GwBoUtf3y3nePeqYlCARe6Vt8.kU2fqgcx5ABUtl68xDK',NULL,'2017-09-22 02:44:26','2017-09-22 02:44:26',1,'','0000-00-00'),(10,'giba','gilberto','M','1994-12-19',NULL,'gilbdader@tosl.com.br','$2y$10$UMWF5EYYEfBmk/YRlfMnWOOr16ZtdMJc4rbybniaAmGMFBp2gaMca',NULL,'2017-09-22 02:47:45','2017-09-22 02:47:45',1,'','0000-00-00'),(11,'giba','gilberto','M','1994-12-19',NULL,'gilbdadadser@tosl.com.br','$2y$10$jC1UaF59IwHqdlAcL/u0V.we8Kkw9w/HvoRN1cuqPyLeksMSeD4pe',NULL,'2017-09-22 02:49:31','2017-09-22 02:49:31',1,'','0000-00-00'),(12,'giba','gilberto','M','1994-12-19',NULL,'giba@giba.com','$2y$10$SNhXKtyk4h0An0DJmRBBhu50EbKkmpgiXfF/Hfk7fZ5fO.aeg5mAu',NULL,'2017-09-22 02:50:15','2017-09-22 02:50:15',1,'','0000-00-00'),(13,'gibao','gilberto','O','1994-12-17',NULL,'gi@g.com.br','$2y$10$Hay2aC/Cy4FlKjG84ac/KeoqX07JYmu72UInrmrINwaryQQnZq2FW',NULL,'2017-09-23 19:44:53','2017-09-23 19:44:53',1,'','0000-00-00'),(14,'gibasama','teste','M','1994-12-17',NULL,'test@tes.com','$2y$10$eOWoC.5yNhQqrrIqyRBWpu9jrKfQ5uWa4YlJzgb50B4n7DKI25gjm',NULL,'2017-09-23 19:48:14','2017-09-23 19:48:14',1,'','0000-00-00'),(15,'gibasama','fafa','M','1994-12-17',NULL,'fafa@fafa.com','$2y$10$F.y6teX39EN9rZIqeorfjupkNd5qjVImxFUtQAixYTIrTUAfc9sKq',NULL,'2017-09-23 19:51:18','2017-09-23 19:51:18',1,'','0000-00-00'),(16,'gibasama','te.c','M','1994-12-17',NULL,'te@te.com','$2y$10$9ITko2OYlIFhtp3AwPU9iesrMr2HoeRsGT46nfRfWb/nDljHtNQkW',NULL,'2017-09-23 19:52:51','2017-09-23 19:52:51',1,'','0000-00-00'),(17,'gibasama','te.c','M','1994-12-17',NULL,'tes@te.com','$2y$10$TVizPsUvd3Co3wb6JyPHtuQQ/F64.z2rZJMncejPMiVBPS6wA8SXO',NULL,'2017-09-23 19:53:54','2017-09-23 19:53:54',1,'','0000-00-00'),(18,'te','te','M','1994-12-17',NULL,'fa.@fa.com.br','$2y$10$f85XogQnLJAqRS/JbzqSReEVfMgdf7j4eyBDcI0DcI5USSeIDXyUe',NULL,'2017-09-23 19:54:56','2017-09-23 19:54:56',1,'','0000-00-00'),(19,'te','te','M','1994-12-17',NULL,'fas@fa.com.br','$2y$10$HfD5E4yMCRgE/r2LeraYEe0B0pBKICVg1O8Y/.6DypO7amLXGToPi',NULL,'2017-09-23 19:55:37','2017-09-23 19:55:37',1,'','0000-00-00'),(20,'feio','tetet','M','1929-12-12',NULL,'tetete@tete.com.br','$2y$10$KdmD3gFgCWpk7Ca3pmdjE.b1sTHYIe/HjOwuHwJdzrSsIHUIDoPVS',NULL,'2017-09-23 19:56:24','2017-09-23 19:56:24',1,'','0000-00-00'),(21,'feio','tetet','M','1929-12-12',NULL,'tetetere@tete.com.br','123456',NULL,'2017-09-23 19:58:12','2017-09-23 19:58:13',1,'eaecete.sesm.cettssattenratesneonmrrtmtampaen','0000-00-00'),(22,'gibasama','tefa','F','1222-12-17',NULL,'tefa@fafa.com.br','123456',NULL,'2017-09-23 19:59:46','2017-09-23 19:59:47',1,'aea.uabbancosgmfngaeodaae.rfedfeoenrnmaeb@aen','0000-00-00'),(23,'fafa','gilberto','M','1994-12-17',NULL,'gilberto@tim.com.br','123456',NULL,'2017-09-23 20:23:05','2017-09-23 20:23:07',1,'glebn.ogsoiarseocopseenrm.beoegtteiane@ilbtis','0000-00-00'),(24,'gibasama','te','F','1994-12-17',NULL,'te@teeee.com.br','gibasama',NULL,'2017-09-23 20:36:32','2017-09-23 20:36:34',1,'todsenpgantm@otgt@ebeeareecbmatsec@t.bta@geet','0000-00-00'),(25,'Giba','gilberto','M','1994-12-17',NULL,'leitor@gmail.com','gibasama',NULL,'2017-09-24 00:07:22','2017-09-24 00:07:27',1,'eaum.sols..adnaluialleeciatgapslrme.g@lsimeou','0000-00-00');
/*!40000 ALTER TABLE `leitores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-09 19:20:01
