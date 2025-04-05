import express from "express"
import registerRouter from "./src/routes/register.route.js"
import loginRouter from "./src/routes/login.route.js"
import initializeDb from "./src/db/initdb.js"
import cookieParser from "cookie-parser"
import refreshTokenRouter from "./src/routes/refreshToken.route.js"
import logoutRouter from "./src/routes/logout.route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

// create required tables before starting the server
initializeDb()

app.use("/auth/register", registerRouter)
app.use("/auth/login", loginRouter)
app.use("/auth/refreshToken", refreshTokenRouter)
app.use("/auth/logout", logoutRouter)

export { app }