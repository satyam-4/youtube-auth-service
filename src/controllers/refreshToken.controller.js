import { ApiError, ApiResponse, asyncHandler } from "myproject-shared-utils"
import tokenGeneration from "../services/tokenGeneration.service.js"
import userRepository from "../repositories/userRepository.js"
import tokenRepository from "../repositories/tokenRepository.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const refreshToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refresh_token
    console.log("incoming:", incomingRefreshToken)
    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await userRepository.getUser(decodedToken.id)

    console.log("user:", user)
    if(!user) {
       throw new ApiError(401, "Invalid refresh token")    
    }

    const storedRefreshToken = await tokenRepository.getRefreshToken(user.id)
    
    console.log("stored refresh token:", storedRefreshToken)
    console.log("incoming refresh token:", incomingRefreshToken)

    if(storedRefreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used")
    }

    const newAccessToken = await tokenGeneration.accessToken(user.email, user.id, user.username)
    const newRefreshToken = await tokenGeneration.refreshToken(user.email, user.id)

    if(newRefreshToken) {
        await tokenRepository.storeRefreshToken(user.id, newRefreshToken)
    }

    return res
    .status(200)
    .cookie("access_token", newAccessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000  // 1 day
    })
    .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 day
    })
    .json(
        new ApiResponse(
            200,
            {},
            "Access token refreshed successfully"
        )
    )
})

export default refreshToken