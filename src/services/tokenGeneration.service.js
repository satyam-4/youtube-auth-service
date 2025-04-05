import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ApiError } from "myproject-shared-utils"

dotenv.config()

class tokenGeneration {
    async accessToken(email, id, username) {
        try {
            return jwt.sign(
                {
                    email,
                    id,
                    username
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
               
            )
        } catch (error) {
            throw new ApiError(500, "Error while generating access token")
        }
    }

    async refreshToken(email, id) {
        try {
            return jwt.sign(
                {
                    email,
                    id
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
                }
            ) 
        } catch (error) {
            throw new ApiError(500, "Error while generating refresh token")
        }
    }
}

export default new tokenGeneration()