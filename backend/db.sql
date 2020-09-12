/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.13-MariaDB : Database - previmo
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

/*Table structure for table `calendars` */

DROP TABLE IF EXISTS `calendars`;

CREATE TABLE `calendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `district_id` varchar(255) DEFAULT NULL,
  `nurse` int(11) DEFAULT NULL,
  `duration_appointment` int(11) DEFAULT NULL,
  `rest_time` int(11) DEFAULT NULL,
  `working_time_from` int(11) DEFAULT NULL,
  `working_time_until` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `calendars` */

insert  into `calendars`(`id`,`name`,`district_id`,`nurse`,`duration_appointment`,`rest_time`,`working_time_from`,`working_time_until`,`createdAt`,`updatedAt`) values 
(2,'cal_2333','[5]',12,1,5,5,7,'2020-08-31 10:26:39','2020-08-31 15:29:55'),
(3,'cal54','[5]',11,14,23,4,9,'2020-08-31 11:47:54','2020-09-10 08:28:12'),
(4,'www','[4,5]',11,44,54,0,2,'2020-08-31 11:49:33','2020-09-10 08:32:47'),
(5,'ddd','[4,5]',11,11,22,4,5,'2020-08-31 11:58:16','2020-09-10 08:20:56'),
(6,'1212','[4,5]',11,12,22,1,2,'2020-09-09 07:00:14','2020-09-10 08:17:24');

/*Table structure for table `districts` */

DROP TABLE IF EXISTS `districts`;

CREATE TABLE `districts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `districts` */

insert  into `districts`(`id`,`name`,`zipcode`,`isActive`,`createdAt`,`updatedAt`) values 
(4,'NewDistrict','[{\"from\":\"111\",\"to\":\"222\"},{\"from\":\"222\",\"to\":\"333\"}]',1,'2020-08-31 11:44:25','2020-08-31 11:44:25'),
(5,'dis_123','[{\"from\":\"333\",\"to\":\"4444\"}]',1,'2020-08-31 11:44:36','2020-08-31 11:44:36');

/*Table structure for table `packages` */

DROP TABLE IF EXISTS `packages`;

CREATE TABLE `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `special_price` int(11) DEFAULT NULL,
  `working_group` int(11) DEFAULT NULL,
  `status` enum('Inactive','Public','Intern') DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `packages` */

/*Table structure for table `templates` */

DROP TABLE IF EXISTS `templates`;

CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) DEFAULT NULL,
  `type` enum('SMS','E-Mail') DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `assign` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject` (`subject`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `templates` */

insert  into `templates`(`id`,`subject`,`type`,`receiver`,`assign`,`message`,`createdAt`,`updatedAt`) values 
(2,'123','SMS',3,3,'<p>dddddd</p>','2020-09-07 11:33:26','2020-09-07 12:23:44'),
(3,'111','E-Mail',1,2,'<p>111</p>','2020-09-07 11:40:20','2020-09-07 11:40:20');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Superadmin','AG-Admin','Doctor','Nurse','Patient') DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `allocation` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`role`,`firstName`,`lastName`,`phoneNumber`,`allocation`,`isActive`,`createdAt`,`updatedAt`) values 
(11,'w','$2b$10$FhWFYyq5Z3ZKbDDssBF04.FOTHeXMc3XSgGYD1nVxD4k2HM8mwXBu','Nurse','as','w','1212222223',1,0,'2020-08-27 08:09:22','2020-08-28 09:25:53'),
(12,'yerycs1015@gmail.com','$2b$10$CDUQFuaoWcyme8a1FUqDKOB5oxCWjz..m8Nfu2keS7R15to5kjedm','AG-Admin','yery','cs','3323421231',0,1,'2020-08-28 09:21:24','2020-08-28 09:21:24'),
(13,'test@gmail.com','$2b$10$CDUQFuaoWcyme8a1FUqDKOB5oxCWjz..m8Nfu2keS7R15to5kjedm','Superadmin','test','123','123456789',0,1,'2020-08-31 11:39:54','2020-08-31 11:39:54'),
(14,'1123','$2b$10$EximPE.pBk8b9Cz/WY3w1eqmjiadbTUxYHwMwmVRFf.bxuSIet55.','Doctor','1234','3223','123122222',0,1,'2020-09-01 08:59:05','2020-09-01 08:59:05'),
(15,'33','$2b$10$HTEip1T1ZGJgi4X7c3Wr1.OAIcy42cgmwssPvCQTmg0hb.kR3TpYG','Doctor','33','432','333',0,1,'2020-09-01 08:59:27','2020-09-01 08:59:27');

/*Table structure for table `working_groups` */

DROP TABLE IF EXISTS `working_groups`;

CREATE TABLE `working_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `admin` varchar(255) DEFAULT NULL,
  `calendar_id` int(11) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `working_groups` */

insert  into `working_groups`(`id`,`name`,`admin`,`calendar_id`,`isActive`,`createdAt`,`updatedAt`) values 
(5,'d','[15,14]',3,1,'2020-09-02 09:14:30','2020-09-02 09:14:30'),
(6,'123','[14]',3,0,'2020-09-07 18:28:32','2020-09-07 18:28:32'),
(7,'test working group','[12]',4,1,'2020-09-10 06:32:24','2020-09-10 06:32:24');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
