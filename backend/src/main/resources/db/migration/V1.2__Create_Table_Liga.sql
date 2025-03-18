CREATE TABLE IF NOT EXISTS `tbl_liga`(
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `local` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)