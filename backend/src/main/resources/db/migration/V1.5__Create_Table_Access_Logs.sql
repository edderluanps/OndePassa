CREATE TABLE IF NOT EXISTS tbl_access_logs (
    id SERIAL,
    username VARCHAR(100) NOT NULL,
    route VARCHAR(255) NOT NULL,
    access_time DATETIME(6) DEFAULT NULL,
    PRIMARY KEY (id)
)
