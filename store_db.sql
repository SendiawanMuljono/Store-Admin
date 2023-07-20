-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2023 at 11:28 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE `kota` (
  `id` varchar(50) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `kode_pos` varchar(10) DEFAULT NULL,
  `provinsi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kota`
--

INSERT INTO `kota` (`id`, `nama`, `kode_pos`, `provinsi`) VALUES
('535aa8e0-63f3-46b4-a412-4d05a5ea4690', 'Bandung', '12234', 'Jawa Barat'),
('550e8400-e29b-41d4-a716-446655340100', 'Semarang', '15234', 'Jawa Tengah'),
('550e8400-e29b-41d4-a716-446655440000', 'Jakarta Barat', '11530', 'Jakarta'),
('550e8400-e29b-41d4-a716-446655440100', 'Surabaya', '12544', 'Jawa Timur'),
('74dc94ae-8a93-4520-b40b-2e4868e69ef1', 'Banda Aceh', '11249', 'Aceh'),
('74e0393d-4114-4ab5-978e-c46bd42edda2', 'Bandung', '12232', 'Jawa Barat'),
('77f87a6d-54de-4efa-b8d1-45de4354446f', 'Medan', '12244', 'Sumatera Utara'),
('a5f2c9b1-db98-4f13-936a-6c0e9802fe66', 'Bandar Lampung', '15532', 'Lampung'),
('ae9ba84e-a85a-4049-b6ef-a821e2c4480c', 'Tanjung Pinang', '12223', 'Kepulauan Riau'),
('b3fb6534-bac1-4d72-a710-7d9b9244b9d8', 'Medan', '12247', 'Sumatera Utara'),
('c5ff34d6-50c5-48df-93aa-798948d33106', 'Medan', '12248', 'Sumatera Utara'),
('ca21712f-69e2-468b-ab7b-3c92d8af164e', 'Medan', '12249', 'Sumatera Utara'),
('e46ebf7c-75a8-477f-a13b-832a7ca8d690', 'Medan', '12250', 'Sumatera Utara'),
('ef429398-c466-4101-9c5e-201215fc4fe8', 'Denpasar', '11111', 'Bali'),
('f41c3381-5073-416f-a6ce-0143147023a0', 'Medan', '12251', 'Sumatera Utara');

-- --------------------------------------------------------

--
-- Table structure for table `penjualan`
--

CREATE TABLE `penjualan` (
  `id` varchar(50) NOT NULL,
  `sales_id` varchar(50) DEFAULT NULL,
  `kota_id` varchar(50) DEFAULT NULL,
  `penghasilan` int(11) DEFAULT NULL,
  `jumlah_barang` int(11) DEFAULT NULL,
  `tanggal_penjualan` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualan`
--

INSERT INTO `penjualan` (`id`, `sales_id`, `kota_id`, `penghasilan`, `jumlah_barang`, `tanggal_penjualan`) VALUES
('13711a1c-2148-4331-ab12-af1c31a0459c', '550e8400-e29b-41d4-a716-446655441116', '535aa8e0-63f3-46b4-a412-4d05a5ea4690', 1212, 13, '2022-03-12'),
('550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440000', 120000000, 120, '2021-05-14'),
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655340100', 100000000, 100, '2021-05-12'),
('550e8400-e29b-41d4-a716-446655440108', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655340100', 60000000, 60, '2022-05-04'),
('550e8400-e29b-41d4-a716-446655440109', '550e8400-e29b-41d4-a716-446655441111', 'ae9ba84e-a85a-4049-b6ef-a821e2c4480c', 40000001, 41, '2022-06-23'),
('5a7379eb-d8e1-45f7-817b-39ca7ec533aa', '807dcc04-6e3a-4c73-b2fd-df216286d56a', 'a5f2c9b1-db98-4f13-936a-6c0e9802fe66', 150000000, 15, '2022-12-24'),
('8202897e-53ed-41cf-b509-9b2a9aa83321', '3e1627f8-653e-4665-8eaa-608f712e2988', '550e8400-e29b-41d4-a716-446655440100', 50000000, 5, '2006-05-05'),
('9a76d8d1-b1ef-4c6f-b4cd-e297917dd991', '550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440000', 1, 1, '2021-05-14'),
('a22fca3e-6f10-457f-a28a-4074407a4c74', 'b698b4f4-b22e-45e2-814e-31d54a7f7f2a', 'ef429398-c466-4101-9c5e-201215fc4fe8', 123123123, 33, '2011-11-11'),
('c7c370d0-0490-4365-aa76-f872bd3244fe', '0c106794-6214-4567-8d8d-34fdf52fe262', '535aa8e0-63f3-46b4-a412-4d05a5ea4690', 1500000000, 123, '2022-12-12'),
('ec859402-ea91-44bd-a9b5-170c3f4738fd', '550e8400-e29b-41d4-a716-446655441115', '535aa8e0-63f3-46b4-a412-4d05a5ea4690', 1, 1, '2020-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` varchar(50) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `grup` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `nama`, `grup`, `email`, `telepon`) VALUES
('0c106794-6214-4567-8d8d-34fdf52fe262', 'Send', 4, 'msendiawaz@gmail.com', '087878228533'),
('129cb065-1113-4766-85b9-1adc96cd6942', 'asd', 1231, 'asd@asd.com', '123'),
('1e829b6f-69fd-4e7c-b7b7-2785574fa30f', 'aaa', 2, 'aaa@aaaa.com', '2342'),
('3e1627f8-653e-4665-8eaa-608f712e2988', 'Assss', 4, 'assss@asss.com', '132'),
('44e47187-5ea7-4a52-8842-cca1cdfcd596', 'adwawd', 2, 'awdawd@mgai.com', '23124'),
('550e8400-e29b-41d4-a716-446655440102', 'Brian', 1, 'brian@sales.com', '087858338291'),
('550e8400-e29b-41d4-a716-446655440103', 'Joseph', 1, 'joseph@sales.com', '087878338391'),
('550e8400-e29b-41d4-a716-446655440111', 'Baru', 2, 'berubah@yahoo.co.id', '082612671372'),
('550e8400-e29b-41d4-a716-446655441111', 'Yuu', 1, 'brians@sales.com', '087858238291'),
('550e8400-e29b-41d4-a716-446655441112', 'Addaw', 2, 'addaw@sales.com', '087859338291'),
('550e8400-e29b-41d4-a716-446655441113', 'Hfgaw', 4, 'hfgaw@sales.com', '083858338291'),
('550e8400-e29b-41d4-a716-446655441114', 'Fhgses', 4, 'fhgses@sales.com', '087868338291'),
('550e8400-e29b-41d4-a716-446655441115', 'Faaa', 3, 'faaa@sales.com', '087852338391'),
('550e8400-e29b-41d4-a716-446655441116', 'Jyjas', 3, 'jyjas@sales.com', '087818338291'),
('550e8400-e29b-41d4-a716-446655441117', 'Dgaas', 2, 'dgaas@sales.com', '083858358291'),
('550e8400-e29b-41d4-a716-446655441118', 'Ikan', 1, 'ikan@sales.com', '086858338291'),
('550e8400-e29b-41d4-a716-446655441119', 'Gewa', 2, 'gewa@sales.com', '087855338291'),
('5b659cbf-87b9-4b6f-8589-2945e88dbdba', 'adwawd', 1, 'awdadwa@aa.com', '1234456'),
('5ee40138-e059-4a4f-8e2d-6bb89484622e', 'tesatew', 1, 'tesatesw@adw.com', '12344'),
('6491b418-efbd-403c-83d2-7a018d8f1a2a', 'awdadw', 1, 'adwadw@adwawd.com', '12324'),
('807dcc04-6e3a-4c73-b2fd-df216286d56a', 'Joko', 4, 'joko@gmail.com', '12123123'),
('8ffb1f14-c4ea-408d-aab7-db3e1da3ab27', 'a', 1, 'a@sales.com', '123123'),
('9b5446e5-4c98-4010-849b-98d483cc9fec', 'asda', 1, 'asda@sales.com', '134'),
('9d892e50-6641-4ace-a73a-30e73e90086f', 'aa', 2, 'aaa@aaa.com', '234'),
('b1579e97-35aa-45b4-960b-093944653c48', 'adw', 2, 'adwadw@gamg.com', '54'),
('b50151c4-cf3e-4104-8a3b-fc8ffbf3ce7e', 'asd', 1, 'asd@aad.com', '1'),
('b698b4f4-b22e-45e2-814e-31d54a7f7f2a', 'muljono', 4, 'muljono@sales.com', '1231'),
('dd5acc15-fe45-4166-ab18-b1d2c888584f', 'rr', 1, 'rr2@gg.com', '2'),
('ed9de616-e8f1-4e66-86dc-58ef28bd8bec', 'tes', 1, 'tes@sales.com', '1231434');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_kodepos` (`kode_pos`);

--
-- Indexes for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_penjualan_sales` (`sales_id`),
  ADD KEY `FK_penjualan_kota` (`kota_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_telepon` (`telepon`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `FK_penjualan_kota` FOREIGN KEY (`kota_id`) REFERENCES `kota` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_penjualan_sales` FOREIGN KEY (`sales_id`) REFERENCES `sales` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
