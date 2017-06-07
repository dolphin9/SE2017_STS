-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: stock
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `usrname` varchar(20) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `regdate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(20) NOT NULL,
  `idnum` char(18) NOT NULL,
  `fmaddr` varchar(30) DEFAULT NULL,
  `career` varchar(20) DEFAULT NULL,
  `edu` varchar(20) DEFAULT NULL,
  `workaddr` varchar(30) DEFAULT NULL,
  `subidnum` char(18) DEFAULT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `type` char(4) NOT NULL,
  `pwderrcnt` int(10) unsigned NOT NULL,
  `pwddate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`usrname`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcement` (
  `annid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `stockid` char(6) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `title` varchar(60) NOT NULL,
  `href` varchar(80) NOT NULL,
  `type` char(4) NOT NULL,
  PRIMARY KEY (`annid`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`stockid`) REFERENCES `stockinfo` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bankcard`
--

DROP TABLE IF EXISTS `bankcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankcard` (
  `id` varchar(19) NOT NULL,
  `cashname` varchar(20) NOT NULL,
  `saved_phone` varchar(20) NOT NULL,
  KEY `cashname` (`cashname`),
  CONSTRAINT `bankcard_ibfk_1` FOREIGN KEY (`cashname`) REFERENCES `cashacc` (`cashname`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cashacc`
--

DROP TABLE IF EXISTS `cashacc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cashacc` (
  `cashname` varchar(20) NOT NULL,
  `accname` varchar(20) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `idnum` varchar(20) NOT NULL,
  `balance` float unsigned NOT NULL,
  `state` tinyint(1) NOT NULL,
  `pwderrcnt` int(10) unsigned NOT NULL,
  `pwddate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`cashname`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `accname` (`accname`),
  CONSTRAINT `cashacc_ibfk_1` FOREIGN KEY (`accname`) REFERENCES `account` (`usrname`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dailytrans`
--

DROP TABLE IF EXISTS `dailytrans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dailytrans` (
  `stockid` char(6) NOT NULL,
  `avgpri` float unsigned DEFAULT NULL,
  `curmax` float unsigned DEFAULT NULL,
  `curmin` float unsigned DEFAULT NULL,
  `openingpri` float unsigned DEFAULT NULL,
  `closingpri` float unsigned DEFAULT NULL,
  `total` int(10) unsigned DEFAULT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`stockid`,`date`),
  CONSTRAINT `dailytrans_ibfk_1` FOREIGN KEY (`stockid`) REFERENCES `stockinfo` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `normalusr`
--

DROP TABLE IF EXISTS `normalusr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `normalusr` (
  `usrname` varchar(20) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `sex` varchar(7) NOT NULL,
  `idnum` char(18) NOT NULL,
  `regdate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `accountname` varchar(20) DEFAULT NULL,
  `fmaddr` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`usrname`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stockhold`
--

DROP TABLE IF EXISTS `stockhold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stockhold` (
  `usrname` varchar(20) NOT NULL,
  `stockid` char(6) NOT NULL,
  `holdnum` int(10) unsigned NOT NULL,
  `price` float unsigned NOT NULL,
  `forsale` int(10) unsigned NOT NULL,
  `index` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  KEY `usrname` (`usrname`),
  KEY `stockid` (`stockid`),
  KEY `index` (`index`),
  CONSTRAINT `stockhold_ibfk_1` FOREIGN KEY (`usrname`) REFERENCES `account` (`usrname`),
  CONSTRAINT `stockhold_ibfk_2` FOREIGN KEY (`stockid`) REFERENCES `stockinfo` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stockinfo`
--

DROP TABLE IF EXISTS `stockinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stockinfo` (
  `stockid` char(6) NOT NULL,
  `name` varchar(45) NOT NULL,
  `circulation` int(10) unsigned NOT NULL,
  `apid` varchar(20) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `inipri` float unsigned NOT NULL,
  `strpri` float unsigned DEFAULT NULL,
  `buypri` float unsigned DEFAULT NULL,
  `sellpri` float unsigned DEFAULT NULL,
  `curmaxpri` float unsigned DEFAULT NULL,
  `curminpri` float unsigned DEFAULT NULL,
  `openingpri` float unsigned DEFAULT NULL,
  `closingpri` float unsigned DEFAULT NULL,
  `totalstock` int(10) unsigned DEFAULT NULL,
  `curstock` int(10) unsigned DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `flag` tinyint(1) NOT NULL,
  PRIMARY KEY (`stockid`),
  KEY `apid` (`apid`),
  CONSTRAINT `stockinfo_ibfk_1` FOREIGN KEY (`apid`) REFERENCES `account` (`usrname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `price` float unsigned NOT NULL,
  `num` int(10) unsigned NOT NULL,
  `stockid` char(6) NOT NULL,
  `time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `buyprice` float unsigned NOT NULL,
  `sellprice` float unsigned NOT NULL,
  `buyerid` varchar(20) NOT NULL,
  `sellerid` varchar(20) NOT NULL,
  KEY `stockid` (`stockid`),
  KEY `buyerid` (`buyerid`),
  KEY `sellerid` (`sellerid`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`stockid`) REFERENCES `stockinfo` (`stockid`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`buyerid`) REFERENCES `account` (`usrname`),
  CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`sellerid`) REFERENCES `account` (`usrname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usrcmd`
--

DROP TABLE IF EXISTS `usrcmd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usrcmd` (
  `accid` varchar(20) NOT NULL,
  `stockid` char(6) NOT NULL,
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `num` int(10) unsigned NOT NULL,
  `sell` tinyint(1) NOT NULL,
  `price` float unsigned NOT NULL,
  `state` varchar(20) NOT NULL,
  `time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`accid`,`index`),
  KEY `index` (`index`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `usrcmd_ibfk_1` FOREIGN KEY (`accid`) REFERENCES `account` (`usrname`),
  CONSTRAINT `usrcmd_ibfk_2` FOREIGN KEY (`stockid`) REFERENCES `stockinfo` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usrfocus`
--

DROP TABLE IF EXISTS `usrfocus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usrfocus` (
  `usrname` varchar(20) NOT NULL,
  `stockid` char(6) NOT NULL,
  KEY `usrname` (`usrname`),
  KEY `stockid` (`stockid`),
  CONSTRAINT `usrfocus_ibfk_1` FOREIGN KEY (`usrname`) REFERENCES `normalusr` (`usrname`),
  CONSTRAINT `usrfocus_ibfk_2` FOREIGN KEY (`stockid`) REFERENCES `stockinfo` (`stockid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12 14:36:59
