-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 30, 2019 at 10:31 AM
-- Server version: 10.2.26-MariaDB-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bnxvojdp_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `lid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL,
  `img` varchar(100) CHARACTER SET utf8 NOT NULL,
  `small_titl1` varchar(50) CHARACTER SET utf8 NOT NULL,
  `small_tip1` longtext CHARACTER SET utf8 NOT NULL,
  `small_titl2` varchar(50) CHARACTER SET utf8 NOT NULL,
  `small_tip2` longtext CHARACTER SET utf8 NOT NULL,
  `middle_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `type` varchar(5) NOT NULL,
  `tags` varchar(5) NOT NULL,
  `actvie` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`lid`, `uid`, `title`, `img`, `small_titl1`, `small_tip1`, `small_titl2`, `small_tip2`, `middle_title`, `type`, `tags`, `actvie`) VALUES
(5, 1, 'gfhdd', '', '', '', '', '', '', 'A1', 'B1', 1),
(7, 1, 'This si hh', '', 'This si hh', 'This si hh', 'This si hh', 'This si hh', 'This si hh', 'A1', 'B1,B2', 1),
(9, 1, 'My new title', '', '', '', '', '', '', 'A1', '', 0),
(10, 1, 'Two pus 2', '', '', '', '', '', '', 'A1', '', 0),
(11, 1, 'A and b plus c', '', '', '', '', '', '', 'A1', '', 0),
(12, 1, 'nine and nine', '', '', '', '', '', '', 'A2', 'T2', 1),
(13, 1, 'This is morning', '', 'This is morning', 'This is morning', 'This is morning', 'This is morning', 'This is morning', 'B1', 'T2,T3', 1),
(14, 1, 'aöåkla  åka till äta', '', '', '', '', '', '', 'A1', '', 0),
(15, 2, 'This is title', '', 'This is title 1', 'This is tip1', 'This is title 1', 'This is tip 2', 'This is middle title', 'A2', 'T2,B1', 1),
(16, 2, 'This is 2nd title', '', 'This is 2nd title 1', 'This is 2nd tip 1', 'This is 2nd title 1', 'This is 2nd tip 2', 'This is 2nd middle title', 'B2', 'T2', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`lid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
