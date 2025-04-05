import { ApiError, asyncHandler } from "myproject-shared-utils"
import userRepository from "../repositories/userRepository.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyJWT = asyncHandler( async(req, res, next) => {
    const accessToken = req.cookies?.access_token
    console.log("access token", accessToken)
    if(!accessToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    console.log("decoded token", decodedToken)
    const user = await userRepository.getUser(decodedToken.id)

    console.log("user", user)
    
    if(!user) {
        throw new ApiError(401, "Invalid access token")
    }

    console.log(user)

    req.user = user

    next()
})