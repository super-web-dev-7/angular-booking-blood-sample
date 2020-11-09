/*
SQLyog Community v12.18 (64 bit)
MySQL - 10.4.8-MariaDB : Database - previmo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`previmo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `previmo`;

/*Table structure for table `patients` */

DROP TABLE IF EXISTS `patients`;

CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `salutation` enum('Herr','Frau') DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `age` date DEFAULT NULL,
  `gender` enum('Male','Female','Divers') DEFAULT NULL,
  `plz` int(11) DEFAULT NULL,
  `ort` varchar(255) DEFAULT NULL,
  `differentPlace` tinyint(1) NOT NULL DEFAULT 0,
  `alternative` tinyint(1) NOT NULL DEFAULT 0,
  `customerStore` tinyint(1) NOT NULL DEFAULT 0,
  `otherStreet` varchar(255) DEFAULT NULL,
  `otherCity` varchar(255) DEFAULT NULL,
  `otherPostalCode` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `patients` */

insert  into `patients`(`id`,`user_id`,`salutation`,`street`,`age`,`gender`,`plz`,`ort`,`differentPlace`,`alternative`,`customerStore`,`otherStreet`,`otherCity`,`otherPostalCode`,`createdAt`,`updatedAt`,`userId`) values 
(7,35,'Herr','qwe','2000-11-23','Male',12,'34',1,1,0,'Berlin','Berlin',10585,'2020-09-30 07:17:14','2020-10-30 11:49:45',NULL),
(8,36,'Herr','Shenyang','2020-10-15','Male',23,'23',1,0,1,'23','2',12524,'2020-10-01 02:11:27','2020-10-01 02:11:27',NULL),
(9,37,'Frau','123','2020-10-07','Male',23,'22',0,0,1,NULL,NULL,NULL,'2020-10-01 02:16:14','2020-10-31 07:58:01',NULL),
(10,43,'Frau','3','2020-10-06','Female',78267,'Aach',0,0,0,NULL,NULL,NULL,'2020-10-15 03:10:37','2020-10-15 03:10:37',NULL),
(11,44,'Frau','ss456','2020-10-15','Male',78267,'Aach',1,0,0,'111','222',333,'2020-10-15 03:17:43','2020-11-05 19:03:54',NULL),
(13,51,'Frau','1','2020-11-18','Male',10585,'Berlin',0,0,1,NULL,NULL,NULL,'2020-11-05 18:51:21','2020-11-05 18:51:21',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
