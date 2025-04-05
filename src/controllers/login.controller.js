import { asyncHandler, ApiError, ApiResponse } from "myproject-shared-utils"
import authRepository from "../repositories/authRepository.js"
import tokenRepository from "../repositories/tokenRepository.js"
import tokenGeneration from "../services/tokenGeneration.service.js"

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    const response = await authRepository.checkCorrectEmailAndPassword(email, password)
    console.log("response: ", response)

    const accessToken = await tokenGeneration.accessToken(email, response[0].id, response[0].username)
    const refreshToken = await tokenGeneration.refreshToken(email, response[0].id)

    if(refreshToken) {
        tokenRepository.storeRefreshToken(response[0].id, refreshToken)
    }

    if(response) {
        return res
        .status(200) 
        .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000  // 1 day
        })
        .cookie("refresh_token",refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        )
    } else {
        throw new ApiError(404, "Incorrect email or password")
    }
})

export default loginUser