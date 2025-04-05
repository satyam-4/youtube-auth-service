import { ApiResponse, asyncHandler } from "myproject-shared-utils"
import tokenRepository from "../repositories/tokenRepository.js"

const logoutUser = asyncHandler( async (req, res) => {
    const user = req.user

    // delete refresh token of the user stored in refresh_tokens table
    await tokenRepository.deleteRefreshToken(user.id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})

export default logoutUser