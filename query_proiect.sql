CREATE TABLE Artist(
	ArtistID INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    DepartamentID INT NOT NULL,
    Nume NVARCHAR(30) NOT NULL,
    Prenume NVARCHAR(30) NOT NULL,
    CNP CHAR(13) UNIQUE NOT NULL,
    Sex CHAR(1) CONSTRAINT CHECK(Sex IN ('M', 'F')),
    Telefon CHAR(10) UNIQUE NOT NULL,
    Strada NVARCHAR(50) NOT NULL,
    Numar CHAR(10) NOT NULL,
    /*DataAngajarii DATE NOT NULL,*/
    Salariu DECIMAL(8,2) NOT NULL
);

SELECT * FROM Artist;

INSERT INTO `Artist` (`ArtistID`,`DepartamentID`,`Nume`,`Prenume`, `CNP`, `Sex`, `Telefon`, `Strada`, `Numar`, /*`DataAngajarii`,*/ `Salariu`)  VALUES ('1','3','Popescu', 'Ion', '1234567890123', 'M', '1234567810', 'Splai', '11', /*'2000-01-20', */'4000');
INSERT INTO `Artist` (`ArtistID`,`DepartamentID`,`Nume`,`Prenume`, `CNP`, `Sex`, `Telefon`, `Strada`, `Numar`, /*`DataAngajarii`,*/ `Salariu`)  VALUES ('2','1','Pop', 'Maria', '9012901290123', 'F', '0123456789', 'Enescu', '20',/* '1998-12-10', */'4500');
INSERT INTO `Artist` (`ArtistID`,`DepartamentID`,`Nume`,`Prenume`, `CNP`, `Sex`, `Telefon`, `Strada`, `Numar`, /*`DataAngajarii`,*/ `Salariu`)  VALUES ('3','2','Ionescu', 'Ana', '1234226890123', 'F', '1277567810', 'Splai', '15', /*'1980-03-10', */'3500');

DELETE FROM Artist WHERE Nume='Pop' AND Prenume='Pop';

CREATE TABLE Departamente(
	DepartamentID INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    NumeDepartament NVARCHAR(50) NOT NULL,
    CodDep NVARCHAR(50) NOT NULL UNIQUE
);

SELECT * FROM Departamente;

INSERT INTO `Departamente` (`DepartamentID`,`NumeDepartament`,`CodDep`)  VALUES ('1','Canto','CANTO101');
INSERT INTO `Departamente` (`DepartamentID`,`NumeDepartament`,`CodDep`)  VALUES ('2','Dans','DANS102');
INSERT INTO `Departamente` (`DepartamentID`,`NumeDepartament`,`CodDep`)  VALUES ('3','Arte','ARTE103');
DELETE FROM Departamente WHERE NumeDepartament='Canto';
CREATE TABLE Evenimente(
	EvenimentID INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    TipEveniment NVARCHAR(50) NOT NULL,
    CodEveniment NVARCHAR(50) NOT NULL UNIQUE,
    Buget DECIMAL(8,2) NOT NULL
);

SELECT * FROM Evenimente;

INSERT INTO `Evenimente` (`EvenimentID`,`TipEveniment`,`CodEveniment`, `Buget`)  VALUES ('1', 'Concert','CONCERT101', '100000');
INSERT INTO `Evenimente` (`EvenimentID`,`TipEveniment`,`CodEveniment`, `Buget`)  VALUES ('2', 'Botez','BOT202', '50000');
INSERT INTO `Evenimente` (`EvenimentID`,`TipEveniment`,`CodEveniment`, `Buget`)  VALUES ('3','Festival','FEST404', '200450');

CREATE TABLE Client(
	ClientID INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    username NVARCHAR(30) UNIQUE NOT NULL,
    Nume NVARCHAR(30) NOT NULL,
    Prenume NVARCHAR(30) NOT NULL,
    Sex CHAR(1) CONSTRAINT CHECK(Sex IN ('M', 'F')),
    Telefon CHAR(10) UNIQUE NOT NULL,
    Strada NVARCHAR(50) NOT NULL,
    Numar CHAR(10) NOT NULL
);

SELECT * FROM Client;

INSERT INTO `Client` (`ClientID`, `username`,`Nume`, `Prenume`, `Sex`, `Telefon`, `Strada`, `Numar`)  VALUES ('1', 'ioana_ardeleanu', 'Ardeleanu', 'Ioana', 'F', '2378195571', 'Victoriei', '98');
INSERT INTO `Client` (`ClientID`, `username`,`Nume`, `Prenume`, `Sex`, `Telefon`, `Strada`, `Numar`)  VALUES ('2', 'bogdan_florea', 'Florea', 'Bogdan', 'M', '2850163829', 'Apusului', '34');
INSERT INTO `Client` (`ClientID`, `username`,`Nume`, `Prenume`, `Sex`, `Telefon`, `Strada`, `Numar`)  VALUES ('3', 'cristi_mihai', 'Mihai', 'Cristian', 'M', '6791603781', 'Splaiul Independentei', '290');

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'ioana_ardeleanu', 'ioana', 'ioanaardeleanu@test.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (2, 'bogdan_florea', 'bogdan', 'bogdanflorea@test.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (3, 'cristi_mihai', 'cristi', 'cristimihai@test.com');

CREATE TABLE ArtistEveniment(
	ArtistID INT,
	EvenimentID INT,
    NOreEveniment INT NOT NULL,
    PRIMARY KEY(ArtistID, EvenimentID)
);

INSERT INTO `ArtistEveniment` (`ArtistID`,`EvenimentID`,`NOreEveniment`)  VALUES ('3','2','6');
INSERT INTO `ArtistEveniment` (`ArtistID`,`EvenimentID`,`NOreEveniment`)  VALUES ('2','1','5');
INSERT INTO `ArtistEveniment` (`ArtistID`,`EvenimentID`,`NOreEveniment`)  VALUES ('1','3','12');

CREATE TABLE ClientEveniment(
	ClientID INT,
	EvenimentID INT,
    NOreInchiriate INT NOT NULL,
    PRIMARY KEY(ClientID, EvenimentID)
);

INSERT INTO `ClientEveniment` (`ClientID`,`EvenimentID`,`NOreInchiriate`)  VALUES ('3','2','5');
INSERT INTO `ClientEveniment` (`ClientID`,`EvenimentID`,`NOreInchiriate`)  VALUES ('2','1','2');
INSERT INTO `ClientEveniment` (`ClientID`,`EvenimentID`,`NOreInchiriate`)  VALUES ('1','3','9');

SELECT * FROM artist