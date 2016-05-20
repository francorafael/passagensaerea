-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 20-Maio-2016 às 05:52
-- Versão do servidor: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ltpvoo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aeroportos`
--

CREATE TABLE IF NOT EXISTS `aeroportos` (
`id` int(11) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `sigla` varchar(45) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `aeroportos`
--

INSERT INTO `aeroportos` (`id`, `descricao`, `cidade`, `uf`, `sigla`) VALUES
(1, 'Congonhas', 'São Paulo', 'SP', 'CGH'),
(2, 'AERO', 'São José do Rio Preto', 'SP', 'SJP'),
(3, 'Marechal Rondom', 'Cuibá', 'MT', 'CGB'),
(4, 'Juscelino', 'Brasília', 'DF', 'BSB');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
`id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `cpf` varchar(30) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `senha`, `cpf`) VALUES
(1, 'rafael', 'rafael@rafael.com', '123456', '02640707124'),
(2, 'João', 'joao@joao.com', '123456', '1523456');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa_voo`
--

CREATE TABLE IF NOT EXISTS `pessoa_voo` (
`id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `idade` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `tp_pessoa` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `poltrona_voos`
--

CREATE TABLE IF NOT EXISTS `poltrona_voos` (
`id` int(11) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  `voo_id` int(11) DEFAULT NULL,
  `pessoavoo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE IF NOT EXISTS `vendas` (
`id` int(11) NOT NULL,
  `valorvoo` varchar(45) DEFAULT NULL,
  `valortaxa` varchar(45) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `voo_id` int(11) DEFAULT NULL,
  `tp_status` char(1) DEFAULT NULL,
  `vendascol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `voos`
--

CREATE TABLE IF NOT EXISTS `voos` (
  `id` int(11) NOT NULL,
  `origem_id` int(11) DEFAULT NULL,
  `destino_id` int(11) DEFAULT NULL,
  `valoradulto` decimal(10,2) DEFAULT NULL,
  `valorcrianca` decimal(10,2) DEFAULT NULL,
  `datainicio` date DEFAULT NULL,
  `datachegada` date DEFAULT NULL,
  `qtdpoltronas` int(11) DEFAULT NULL,
  `valortaxa` decimal(10,2) DEFAULT NULL,
  `horainicio` time DEFAULT NULL,
  `horachegada` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `voos`
--

INSERT INTO `voos` (`id`, `origem_id`, `destino_id`, `valoradulto`, `valorcrianca`, `datainicio`, `datachegada`, `qtdpoltronas`, `valortaxa`, `horainicio`, `horachegada`) VALUES
(1, 1, 2, '300.00', '200.00', '2016-05-20', '2016-05-20', 100, '50.00', '12:00:00', '14:50:00'),
(2, 1, 3, '350.00', '250.00', '2016-05-20', '2016-05-20', 100, '50.00', '13:00:00', '15:50:00'),
(3, 1, 4, '600.00', '450.00', '2016-05-20', '2016-05-21', 100, '50.00', '09:00:00', '13:00:00'),
(4, 2, 1, '250.00', '190.00', '2016-05-30', '2016-05-30', 100, '30.00', '09:00:00', '13:00:00'),
(5, 3, 1, '350.00', '450.00', '2016-05-30', '2016-05-30', 100, '30.00', '09:00:00', '15:50:00'),
(7, 4, 1, '300.00', '250.00', '2016-05-30', '2016-05-30', 100, '30.00', '12:00:00', '15:50:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aeroportos`
--
ALTER TABLE `aeroportos`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pessoa_voo`
--
ALTER TABLE `pessoa_voo`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_cliente_crianca_idx` (`cliente_id`);

--
-- Indexes for table `poltrona_voos`
--
ALTER TABLE `poltrona_voos`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_poltrona_voo_idx` (`voo_id`), ADD KEY `fk_poltrona_cliente_idx` (`pessoavoo_id`);

--
-- Indexes for table `vendas`
--
ALTER TABLE `vendas`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_vendas_voo_id_idx` (`voo_id`), ADD KEY `kf_vendas_client_id_idx` (`cliente_id`);

--
-- Indexes for table `voos`
--
ALTER TABLE `voos`
 ADD PRIMARY KEY (`id`), ADD KEY `FK_VooOridemID_LocalidadeID_idx` (`origem_id`), ADD KEY `FK_VooDestinoID_LocalidadeID_idx` (`destino_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aeroportos`
--
ALTER TABLE `aeroportos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pessoa_voo`
--
ALTER TABLE `pessoa_voo`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `poltrona_voos`
--
ALTER TABLE `poltrona_voos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vendas`
--
ALTER TABLE `vendas`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `pessoa_voo`
--
ALTER TABLE `pessoa_voo`
ADD CONSTRAINT `fk_cliente_crianca` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `poltrona_voos`
--
ALTER TABLE `poltrona_voos`
ADD CONSTRAINT `fk_poltrona_cliente` FOREIGN KEY (`pessoavoo_id`) REFERENCES `pessoa_voo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_poltrona_voo` FOREIGN KEY (`voo_id`) REFERENCES `voos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `vendas`
--
ALTER TABLE `vendas`
ADD CONSTRAINT `fk_vendas_voo_id` FOREIGN KEY (`voo_id`) REFERENCES `voos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `kf_vendas_client_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `voos`
--
ALTER TABLE `voos`
ADD CONSTRAINT `fk_voo_destino` FOREIGN KEY (`destino_id`) REFERENCES `aeroportos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_voo_origem` FOREIGN KEY (`origem_id`) REFERENCES `aeroportos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
