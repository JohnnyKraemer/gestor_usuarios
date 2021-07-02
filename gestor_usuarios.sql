CREATE DATABASE IF NOT EXISTS `gestor_usuarios` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gestor_usuarios`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cargos`
--

INSERT INTO `cargos` (`id`, `nome`) VALUES
(3, 'Administrador'),
(4, 'Desenvolvedor'),
(5, 'Financeiro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `perfis`
--

CREATE TABLE `perfis` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `perfis`
--

INSERT INTO `perfis` (`id`, `nome`) VALUES
(1, 'Perfil 1'),
(2, 'Perfil 2'),
(6, 'Perfil 3');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `create_date_time` datetime DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nome` varchar(50) NOT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `update_date_time` datetime DEFAULT NULL,
  `cargo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `cpf`, `create_date_time`, `data_nascimento`, `nome`, `sexo`, `update_date_time`, `cargo_id`) VALUES
(7, '11111111111', '2021-07-02 16:08:50', '1995-11-07', 'Johnny Rockembach Kraemer', 'm', '2021-07-02 16:08:50', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_perfis`
--

CREATE TABLE `usuarios_perfis` (
  `usuarios_id` int(11) NOT NULL,
  `perfis_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios_perfis`
--

INSERT INTO `usuarios_perfis` (`usuarios_id`, `perfis_id`) VALUES
(7, 1),
(7, 2),
(7, 6);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_gseglqgqp16hn9j3pqn06m8oy` (`nome`);

--
-- Índices para tabela `perfis`
--
ALTER TABLE `perfis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_10p6gqv0q50bo17oxgx9p29il` (`nome`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_2et2smpfrtsohr7w9fe1v8a5e` (`cpf`),
  ADD KEY `FK65oyat1njp8ljm3nof536upvj` (`cargo_id`);

--
-- Índices para tabela `usuarios_perfis`
--
ALTER TABLE `usuarios_perfis`
  ADD PRIMARY KEY (`usuarios_id`,`perfis_id`),
  ADD UNIQUE KEY `UK_h8qm9310rmqe909asnjvv4o7w` (`perfis_id`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK65oyat1njp8ljm3nof536upvj` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`);

--
-- Limitadores para a tabela `usuarios_perfis`
--
ALTER TABLE `usuarios_perfis`
  ADD CONSTRAINT `FK7u2rgek8mfo0xwslfx0b56mtr` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `FKcvq90lk95py1n889uimu18atx` FOREIGN KEY (`perfis_id`) REFERENCES `perfis` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
