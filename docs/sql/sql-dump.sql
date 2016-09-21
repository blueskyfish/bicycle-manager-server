-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 21. Sep 2016 um 15:44
-- Server Version: 5.1.73-log
-- PHP-Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Datenbank: `moonfish_bicycle`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bicycle-battery`
--

DROP TABLE IF EXISTS `bicycle-battery`;
CREATE TABLE IF NOT EXISTS `bicycle-battery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(120) NOT NULL COMMENT 'the unique token of the user',
  `date` date NOT NULL COMMENT 'The day on which the battery was charged',
  `mileage` int(11) NOT NULL COMMENT 'The current mileage on the control unit',
  `average_speed` int(11) NOT NULL COMMENT 'The average speed',
  `leftover` int(11) NOT NULL COMMENT 'The distance that can still be driven with the battery',
  PRIMARY KEY (`id`),
  KEY `IDX_TOKEN` (`token`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=72 ;

--
-- TRUNCATE Tabelle vor dem Einfügen `bicycle-battery`
--

TRUNCATE TABLE `bicycle-battery`;
--
-- Daten für Tabelle `bicycle-battery`
--

INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(1, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-02-06', 0, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(2, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-03-11', 665, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(3, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-03-17', 1429, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(4, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-03-26', 2259, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(5, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-04-10', 2892, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(6, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-04-17', 3724, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(7, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-04-21', 4451, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(8, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-04-28', 5306, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(9, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-05-07', 6151, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(10, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-06-03', 6922, 0, 210);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(11, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-06-10', 7822, 0, 100);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(12, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-06-23', 8764, 0, 30);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(13, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-06-30', 9591, 0, 180);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(14, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-03', 10549, 0, 40);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(15, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-04', 10659, 0, 77);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(16, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-08', 11707, 0, 10);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(17, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-10', 12017, 0, 580);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(18, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-13', 12891, 0, 110);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(19, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-15', 13218, 0, 190);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(20, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-21', 14163, 0, 80);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(21, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-07-28', 15098, 0, 50);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(22, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-08-03', 16063, 0, 30);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(23, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-08-08', 17018, 0, 100);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(24, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-08-14', 18036, 0, 40);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(25, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-08-20', 18935, 0, 40);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(26, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-08-28', 19491, 0, 330);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(27, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-09-01', 20445, 0, 80);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(28, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-09-10', 21424, 0, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(29, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-09-17', 22387, 0, 10);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(30, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-09-24', 23218, 0, 140);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(31, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-09-30', 23977, 190, 40);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(32, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-10-06', 24803, 187, 120);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(33, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '0000-00-00', 25669, 188, 70);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(34, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-10-13', 25669, 188, 70);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(39, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-10-20', 26394, 192, 100);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(40, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-10-27', 27217, 189, 60);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(41, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-11-10', 28033, 190, 30);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(42, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-11-16', 28819, 181, 100);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(44, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-12-02', 29635, 184, 30);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(45, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2015-12-27', 30247, 193, 210);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(46, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-01-26', 31064, 189, 10);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(47, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-02-02', 31798, 186, 90);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(48, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-03-08', 32459, 189, 130);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(49, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-03-15', 33168, 180, 90);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(52, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-04-30', 33933, 185, 130);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(53, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-05-07', 34711, 183, 110);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(54, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-05-17', 35567, 181, 70);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(55, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-05-29', 36386, 185, 80);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(56, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-06-04', 37249, 189, 30);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(57, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-06-18', 38214, 179, 0);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(58, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-06-22', 38930, 193, 250);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(59, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-06-27', 39779, 178, 110);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(60, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-07-04', 40599, 191, 140);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(61, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-07-11', 41431, 188, 100);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(62, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-07-18', 42295, 190, 50);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(63, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-07-25', 43179, 187, 70);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(64, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-08-01', 44162, 181, 40);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(65, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-08-08', 44803, 183, 260);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(66, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-08-16', 45162, 167, 200);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(67, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-08-20', 45825, 180, 250);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(68, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-08-26', 46694, 179, 110);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(69, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-09-07', 47568, 178, 60);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(70, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-09-13', 48358, 186, 120);
INSERT INTO `bicycle-battery` (`id`, `token`, `date`, `mileage`, `average_speed`, `leftover`) VALUES(71, '7f6e5f50cf34e65cf0f3f7b5b9b4ec0e188ca185', '2016-09-20', 49241, 188, 120);
COMMIT;
