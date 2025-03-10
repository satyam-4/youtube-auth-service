import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool }  = pg

const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

export default pool