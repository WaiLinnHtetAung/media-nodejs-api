import express from "express"
import UserController from "../controllers/UserController.js"
import { validateBody, userSchema } from '../utils/facades.js'

const router = express.Router()

router.post('/register', validateBody(userSchema.registerSchema) ,UserController.register);
router.post('/login', validateBody(userSchema.loginSchema) ,UserController.login);

export default router