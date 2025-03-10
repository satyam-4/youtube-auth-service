import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService} from "../models/userModel.js"

const createUser = async (req, res) => {
    const {username, email, password} = req.body
    const createdUser = await createUserService(username, email, password)

    return res
    .status(201)
    .json({
        mssg: "user created successfully",
        createdUser
    })
}

const getAllUsers = async (req, res) => {
    const users = await getAllUsersService()

    return res
    .status(200)
    .json({
        mssg: "users fetched successfully",
        users
    })
}

const getUserById = async (req, res) => {
    const {id} = req.body
    const user = await getUserByIdService(id)

    return res
    .status(200)
    .json({
        mssg: "user fetched successfully",
        user
    })
}

const updateUser = async (req, res) => {
    const {username, email, password, id} = req.body
    const updatedUser = await updateUserService(id, username, email, password)

    return res
    .status(200)
    .json({
        mssg: "user updated successfully",
        updatedUser
    })
}

const deleteUser = async (req, res) => {
    const {id} = req.body
    const deletedUser = deleteUserService(id)

    return res
    .status(200)
    .json({
        mssg: "user deleted successfully",
        deletedUser
    })
}

export {
    createUser, getAllUsers, getUserById,
    updateUser, deleteUser
}