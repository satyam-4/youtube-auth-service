import { ApiError } from "myproject-shared-utils"
import pool from "../db/db.js"

class tokenRepository {
    async storeRefreshToken(userId, refreshToken) {
        const query = `
            INSERT INTO refresh_tokens (user_id, token, expires_at)
            VALUES ($1, $2, NOW() + INTERVAL '7 days')
            ON CONFLICT (user_id)
            DO UPDATE SET 
                token = EXCLUDED.token,
                expires_at = NOW() + INTERVAL '7 days'
            RETURNING *
        `
        try {
            console.log("refresh token: ", refreshToken)
            const result = await pool.query(query, [userId, refreshToken])
            return result.rows[0]
        } catch (error) {
            console.error("Database error:", error.message)
            throw new ApiError(500, "Error while storing refresh token")
        }
    }

    async getRefreshToken(userId) {
        const query = `
            SELECT token 
            FROM refresh_tokens 
            WHERE user_id = $1
        `
        try {
            const result = await pool.query(query, [userId])
            return result.rows[0]?.token || null
        } catch (error) {
            console.log("Error while fetching refresh token ", error)
        }
    }

    async deleteRefreshToken(userId) {
        const query = `
            DELETE FROM refresh_tokens
            WHERE user_id = $1
        `
        try {
            await pool.query(query, [userId])
            return {
                success: true,
                message: "Refresh token deleted successfully"
            }
        } catch (error) {
            console.log("Error while deleting refresh token ", error)
        }
    }
}

export default new tokenRepository()