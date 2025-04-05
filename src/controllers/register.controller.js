import { asyncHandler, ApiError, ApiResponse } from "myproject-shared-utils"
import { cleanupTempFiles } from "../utils/cleanupTempFiles.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import userRepository from "../repositories/userRepository.js"

const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body

    //  check entered details
    if(
        [username, email, password].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    // let avatarLocalPath = ""
    // if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
    //     avatarLocalPath = req.files.avatar[0].path
    // }

    //  check if the user is already present or not
    const response = await userRepository.checkUserExistence(username, email)
    if(response) {
        // cleanupTempFiles([avatarLocalPath])
        throw new ApiError(409, "User already exists")
    }

    // if(!avatarLocalPath) {
    //     throw new ApiError(400, "Avatar is required")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)

    // if(!avatar) {
    //     throw new ApiError(400, "Avatar is required")
    // }

    // cleanupTempFiles([avatarLocalPath])

    const newUser = await userRepository.createNewUser(username, email, password)

    return res
    .status(200)
    .json(
        new ApiResponse(200, newUser, "User created successfully")
    )
})

export default registerUser