import pool from "../db/db.js"
import argon2 from "argon2"

class userRepository {
    async checkUserExistence (username, email) {
        const result = await pool.query("SELECT * FROM users WHERE username=$1 AND email=$2", [username, email])
        return result.rows[0]
    }
    
    async createNewUser (username, email, password) {
        password = await argon2.hash(password)
        const result = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password])
        return result.rows[0]
    }

    async getUser (id) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        return result.rows[0]
    }
}

export default new userRepository()