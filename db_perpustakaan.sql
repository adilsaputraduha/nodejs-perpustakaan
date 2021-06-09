/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.17-MariaDB : Database - db_perpustakaan
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_perpustakaan` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `db_perpustakaan`;

/*Table structure for table `table_anggota` */

DROP TABLE IF EXISTS `table_anggota`;

CREATE TABLE `table_anggota` (
  `kode_anggota` char(10) NOT NULL,
  `nama_anggota` varchar(100) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`kode_anggota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `table_anggota` */

insert  into `table_anggota`(`kode_anggota`,`nama_anggota`,`alamat`) values 
('1810005','Adil Saputra Duha','Padang'),
('1818181','N\'golo Kante','Bandung'),
('1818182','Haaland','Jakarta'),
('1818183','Kylian Mbappe','Lampung'),
('1818184','Elie Eboy','Malang'),
('1818185','Fadli Zon','Yogyakarta');

/*Table structure for table `table_book` */

DROP TABLE IF EXISTS `table_book`;

CREATE TABLE `table_book` (
  `id_buku` int(11) NOT NULL AUTO_INCREMENT,
  `kode_buku` char(30) DEFAULT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `pengarang` varchar(100) DEFAULT NULL,
  `penerbit` varchar(100) DEFAULT NULL,
  `kategori` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_buku`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `table_book` */

insert  into `table_book`(`id_buku`,`kode_buku`,`judul`,`pengarang`,`penerbit`,`kategori`) values 
(4,'1323248711','Matematika Dasar','Nazaruddin','Setya Novanto',2),
(5,'13222121334','Sejarah Kemerdekaan','Anas Urbaningrum','Edhy Prabowo',1),
(8,'14141424242','Fisika Lanjutan','Rocky Gerung','Mahfud Md',6);

/*Table structure for table `table_category` */

DROP TABLE IF EXISTS `table_category`;

CREATE TABLE `table_category` (
  `id_kategori` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kategori` varchar(255) DEFAULT NULL,
  `rak` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `table_category` */

insert  into `table_category`(`id_kategori`,`nama_kategori`,`rak`) values 
(1,'Sejarah','12'),
(2,'Matematika','18'),
(3,'Astronomi','20'),
(6,'Fisika','10'),
(7,'Ekonomi','01'),
(8,'Geografi','02'),
(9,'Sosiologi','03');

/*Table structure for table `table_peminjaman` */

DROP TABLE IF EXISTS `table_peminjaman`;

CREATE TABLE `table_peminjaman` (
  `id_peminjaman` int(11) NOT NULL AUTO_INCREMENT,
  `t_peminjaman` date DEFAULT NULL,
  `t_kembali` date DEFAULT NULL,
  `buku_id` int(11) DEFAULT NULL,
  `anggota_kode` char(10) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_peminjaman`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `table_peminjaman` */

insert  into `table_peminjaman`(`id_peminjaman`,`t_peminjaman`,`t_kembali`,`buku_id`,`anggota_kode`,`user_id`) values 
(1,'2021-06-06','2021-06-07',4,'1810005',1);

/*Table structure for table `table_temporary` */

DROP TABLE IF EXISTS `table_temporary`;

CREATE TABLE `table_temporary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kd_anggota` char(10) DEFAULT NULL,
  `buku` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `table_temporary` */

/*Table structure for table `table_user` */

DROP TABLE IF EXISTS `table_user`;

CREATE TABLE `table_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `table_user` */

insert  into `table_user`(`id_user`,`email`,`name`,`password`) values 
(1,'adilsaputra0101@gmail.com','Adil Saputra Duha','1234');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
