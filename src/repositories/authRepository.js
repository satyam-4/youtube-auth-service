import { ApiError } from "myproject-shared-utils"
import pool from "../db/db.js"
import argon2 from "argon2"

class authRepository {
    async checkCorrectEmailAndPassword(email, password) {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        let storedPassword = ""
        if(result.rows.length > 0) {
            storedPassword = result.rows[0].password
        } else {
            throw new ApiError(400, "Email or password is incorrect")
        }
        const match = await argon2.verify(storedPassword, password)
        if(match) {
            return result.rows.filter(data => data !== password)
        } else {
            return false
        }
    }
}

export default new authRepository()