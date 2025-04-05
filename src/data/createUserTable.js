import pool from "../db/db.js"

export const createUserTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username VARCHAR(30) NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            avatar TEXT,
            coverimage TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
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