DROP DATABASE IF EXISTS saverequest;
CREATE DATABASE IF NOT EXISTS saverequest;
USE saverequest;

SELECT 'CREATING DATABASE STRUCTURE' as 'INFO';

DROP TABLE IF EXISTS request;

CREATE TABLE request (
    user_id       INT           NOT NULL,
    user_name     VARCHAR(20)   NOT NULL,
    user_password VARCHAR(20)   NOT NULL,
    request_type  VARCHAR(20)   NOT NULL,
    request_date  DATE          NOT NULL,
    request       TEXT          NOT NULL,
    PRIMARY KEY (user)
);