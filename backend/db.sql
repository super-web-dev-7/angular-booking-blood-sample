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

/*Table structure for table `template_actions` */

DROP TABLE IF EXISTS `template_actions`;

CREATE TABLE `template_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sms` tinyint(1) NOT NULL DEFAULT 0,
  `email` tinyint(1) NOT NULL DEFAULT 0,
  `patient` tinyint(1) NOT NULL DEFAULT 0,
  `doctor` tinyint(1) NOT NULL DEFAULT 0,
  `nurse` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `template_actions` */

insert  into `template_actions`(`id`,`name`,`sms`,`email`,`patient`,`doctor`,`nurse`,`createdAt`,`updatedAt`) values 

(1,'Appointment Delay',1,0,1,0,0,'2020-10-15 19:57:07','2020-10-15 19:57:11'),

(2,'Appointment Shift',1,1,1,0,0,'2020-10-15 19:57:13','2020-10-15 19:57:15'),

(3,'Appointment Taken',1,1,1,0,0,'2020-10-15 19:57:22','2020-10-15 19:57:18'),

(4,'Patient Not There',0,1,1,0,0,'2020-10-15 19:57:23','2020-10-15 19:57:28'),

(5,'Appointment Cancel',0,1,1,0,0,'2020-10-15 19:57:25','2020-10-15 19:57:30'),

(6,'60 minutes before Appointment',1,0,1,0,0,'2020-10-29 01:40:10','2020-10-29 01:40:14'),

(7,'24 hours before Appointment',1,0,1,0,0,'2020-10-29 01:40:30','2020-10-29 01:40:33'),

(8,'Appointment Cancel By Patient',0,1,1,0,0,'2020-10-30 04:07:22','2020-10-30 04:07:28');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
