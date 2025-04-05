import { Router } from "express"
import refreshToken from "../controllers/refreshToken.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/").post(verifyJWT, refreshToken)

export default router