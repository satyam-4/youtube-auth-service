import { Router } from "express"
import logoutUser from "../controllers/logout.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/").post(verifyJWT, logoutUser)

export default router