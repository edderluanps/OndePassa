CREATE TABLE IF NOT EXISTS tbl_transmissao (
  id BIGINT NOT NULL AUTO_INCREMENT,
  canal varchar(255) DEFAULT NULL,
  canal_img varchar(255) DEFAULT NULL,
  link_transmissao varchar(255) DEFAULT NULL,
  localidade_transmissao varchar(255) DEFAULT NULL,
  transmissao boolean NOT NULL,
  evento_id bigint NOT NULL,
  PRIMARY KEY (id)
);