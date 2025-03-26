import pool from "../db/db.js"

export const createUserTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(30) NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(12) NOT NULL,
            avatar TEXT,
            coverimage TEXT DEFAULT '',
            refreshToken TEXT DEFAULT ''
        )
    `
    try {
        const res = await pool.query(queryText)
        if(res) {
            console.log("users table created successfully")
        }
    } catch (error) {
        console.log("error while creating users table ", error)
    }
}