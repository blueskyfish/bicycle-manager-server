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
