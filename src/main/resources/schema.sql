DROP TABLE IF EXISTS User;
create table User (
    id int AUTO_INCREMENT,
    username VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    type VARCHAR(8),
    password INT
);