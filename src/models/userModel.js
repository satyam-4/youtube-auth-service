import pool from "../db/db.js"

export const getAllUsersService = async () => {
    const users = await pool.query("SELECT * FROM users")
    console.log(users)
    return users.rows
}

export const getUserByIdService = async (id) => {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    console.log(user)
    return user.rows[0]
}

export const createUserService = async (username, email, password) => {
    const user = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email", [username, email, password])
    console.log(user)
    return user.rows[0]
}

export const updateUserService = async (id, username, email, password) => {
    const updatedUser = await pool.query("UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [username, email, password, id]) 
    console.log(updatedUser)
    return updatedUser.rows[0]
}

export const deleteUserService = async (id) => {
    const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING username", [id])
    console.log(deletedUser)
    return deletedUser.rows[0]
}