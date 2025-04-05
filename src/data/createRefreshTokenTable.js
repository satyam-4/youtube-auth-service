import pool from "../db/db.js"

export const createRefreshTokenTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS refresh_tokens (
            id SERIAL PRIMARY KEY,
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            token TEXT NOT NULL UNIQUE,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `
    try {
        const res = await pool.query(queryText)
        if(res) {
            console.log("refresh_tokens table created successfully")
        }
    } catch (error) {
        console.log("error while creating refresh_tokens table ", error)
    }
}