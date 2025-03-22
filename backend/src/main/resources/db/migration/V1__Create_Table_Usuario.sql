CREATE TABLE IF NOT EXISTS tbl_usuario(
  id BIGINT NOT NULL AUTO_INCREMENT,
  email varchar(255) DEFAULT NULL,
  nome varchar(255) DEFAULT NULL,
  senha varchar(255) DEFAULT NULL,
  preferencia varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)