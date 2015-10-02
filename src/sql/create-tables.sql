
SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bicycle-distances`
--

DROP TABLE IF EXISTS `bicycle-distances`;
CREATE TABLE `bicycle-distances` (
  `distance_id` int(11) NOT NULL,
  `token` varchar(40) NOT NULL,
  `date` date NOT NULL,
  `distance` decimal(20,2) NOT NULL,
  `average_speed` decimal(20,2) NOT NULL,
  `range_distance` decimal(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bicycle-distances`
--
ALTER TABLE `bicycle-distances`
  ADD PRIMARY KEY (`distance_id`),
  ADD KEY `IDX_TOKEN` (`token`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bicycle-distances`
--
ALTER TABLE `bicycle-distances`
  MODIFY `distance_id` int(11) NOT NULL AUTO_INCREMENT;SET FOREIGN_KEY_CHECKS=1;

COMMIT;

