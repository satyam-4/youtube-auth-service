CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(12) NOT NULL,
    avatar TEXT ,
    coverimage TEXT DEFAULT '',
    refreshToken TEXT DEFAULT ''
)