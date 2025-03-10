import express from "express"
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "./src/controllers/user.controller.js"
import { createUserTable } from "./src/data/createUserTable.js"
import registerRouter from "./src/routes/register.route.js"
import loginRouter from "./src/routes/login.route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// create user table before starting the server
createUserTable()

app.get("/", (req, res) => {
    res.send("App is working fine")
})

app.use("/auth/register", registerRouter)
app.use("/auth/login", loginRouter)

export { app }