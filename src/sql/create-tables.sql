
SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bicycle-battery`
--

DROP TABLE IF EXISTS `bicycle-battery`;
CREATE TABLE `bicycle-battery` (
  `id` int(11) NOT NULL,
  `token` varchar(40) NOT NULL,
  `date` date NOT NULL COMMENT 'The day was on the charged battery' ,
  `mileage` int(11) NOT NULL COMMENT 'The current mileage on the control unit',
  `average_speed` decimal(20,2) NOT NULL,
  `distance` int(11) NOT NULL COMMENT 'The distance with the battery'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bicycle-battery`
--
ALTER TABLE `bicycle-battery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_TOKEN` (`token`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bicycle-battery`
--
ALTER TABLE `bicycle-battery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

SET FOREIGN_KEY_CHECKS=1;

COMMIT;

