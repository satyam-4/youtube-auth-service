import pool from "./src/db/db.js"
import { app } from "./app.js"
import dotenv from "dotenv"

dotenv.config()

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL")
        app.listen(process.env.PORT, () => {
            console.log(`Auth service is listening at port ${process.env.PORT}`)
        })
    })
    .catch((error) => console.error("Database connection failed ", error))