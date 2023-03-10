-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: companie
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'ioana_ardeleanu','ioana','ioanaardeleanu@test.com'),(2,'bogdan_florea','bogdan','bogdanflorea@test.com'),(3,'cristi_mihai','cristi','cristimihai@test.com');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `ArtistID` int NOT NULL AUTO_INCREMENT,
  `DepartamentID` int NOT NULL,
  `Nume` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Prenume` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `CNP` char(13) NOT NULL,
  `Sex` char(1) DEFAULT NULL,
  `Telefon` char(10) NOT NULL,
  `Strada` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Numar` char(10) NOT NULL,
  `Salariu` decimal(8,2) NOT NULL,
  PRIMARY KEY (`ArtistID`),
  UNIQUE KEY `ArtistID` (`ArtistID`),
  UNIQUE KEY `CNP` (`CNP`),
  UNIQUE KEY `Telefon` (`Telefon`),
  CONSTRAINT `artist_chk_1` CHECK ((`Sex` in (_utf8mb4'M',_utf8mb4'F')))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (2,1,'Pop','Maria','9012901290123','F','0123456789','Enescu','20',4500.00),(3,2,'Ionescu','Ana','1234226890123','F','1277567810','Splai','15',3500.00),(4,30,'Popescu','Ana','6011111111226','F','0707070712','Iuliu','22',3800.00);
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artisteveniment`
--

DROP TABLE IF EXISTS `artisteveniment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artisteveniment` (
  `ArtistID` int NOT NULL,
  `EvenimentID` int NOT NULL,
  `NOreEveniment` int NOT NULL,
  PRIMARY KEY (`ArtistID`,`EvenimentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artisteveniment`
--

LOCK TABLES `artisteveniment` WRITE;
/*!40000 ALTER TABLE `artisteveniment` DISABLE KEYS */;
INSERT INTO `artisteveniment` VALUES (1,2,12),(1,3,12),(2,1,5),(3,2,6);
/*!40000 ALTER TABLE `artisteveniment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `ClientID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Nume` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Prenume` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Sex` char(1) DEFAULT NULL,
  `Telefon` char(10) NOT NULL,
  `Strada` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Numar` char(10) NOT NULL,
  PRIMARY KEY (`ClientID`),
  UNIQUE KEY `ClientID` (`ClientID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `Telefon` (`Telefon`),
  CONSTRAINT `client_chk_1` CHECK ((`Sex` in (_utf8mb4'M',_utf8mb4'F')))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'ioana_ardeleanu','Ardeleanu','Ioana','F','2378195571','Victoriei','98'),(2,'bogdan_florea','Florea','Bogdan','M','2850163829','Apusului','34'),(3,'cristi_mihai','Mihai','Cristian','M','6791603781','Splaiul Independentei','290');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clienteveniment`
--

DROP TABLE IF EXISTS `clienteveniment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clienteveniment` (
  `ClientID` int NOT NULL,
  `EvenimentID` int NOT NULL,
  `NOreInchiriate` int NOT NULL,
  PRIMARY KEY (`ClientID`,`EvenimentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clienteveniment`
--

LOCK TABLES `clienteveniment` WRITE;
/*!40000 ALTER TABLE `clienteveniment` DISABLE KEYS */;
INSERT INTO `clienteveniment` VALUES (1,3,9),(2,1,2),(3,2,5);
/*!40000 ALTER TABLE `clienteveniment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamente`
--

DROP TABLE IF EXISTS `departamente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamente` (
  `DepartamentID` int NOT NULL AUTO_INCREMENT,
  `NumeDepartament` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `CodDep` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`DepartamentID`),
  UNIQUE KEY `DepartamentID` (`DepartamentID`),
  UNIQUE KEY `CodDep` (`CodDep`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamente`
--

LOCK TABLES `departamente` WRITE;
/*!40000 ALTER TABLE `departamente` DISABLE KEYS */;
INSERT INTO `departamente` VALUES (1,'Canto','CANTO101'),(2,'Dans','DANS102'),(3,'Arte','ARTE103');
/*!40000 ALTER TABLE `departamente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evenimente`
--

DROP TABLE IF EXISTS `evenimente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evenimente` (
  `EvenimentID` int NOT NULL AUTO_INCREMENT,
  `TipEveniment` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `CodEveniment` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Buget` decimal(8,2) NOT NULL,
  PRIMARY KEY (`EvenimentID`),
  UNIQUE KEY `EvenimentID` (`EvenimentID`),
  UNIQUE KEY `CodEveniment` (`CodEveniment`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evenimente`
--

LOCK TABLES `evenimente` WRITE;
/*!40000 ALTER TABLE `evenimente` DISABLE KEYS */;
INSERT INTO `evenimente` VALUES (1,'Concert','CONCERT101',100000.00),(2,'Botez','BOT202',50000.00),(3,'Festival','FEST404',200450.00);
/*!40000 ALTER TABLE `evenimente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-19 18:49:47
