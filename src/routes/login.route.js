import { Router } from "express"
import loginUser from "../controllers/login.controller.js"

const router = Router()

router.route("/").get(loginUser)

export default router