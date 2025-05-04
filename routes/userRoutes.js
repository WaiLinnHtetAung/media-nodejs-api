import express from "express"
import UserController from "../controllers/UserController.js"
import { validateBody, validateRole, userSchema } from '../utils/facades.js'

const router = express.Router()

router.post('/register', validateBody(userSchema.registerSchema) ,UserController.register);
router.post('/login', validateBody(userSchema.loginSchema) ,UserController.login);
router.get('/', validateRole(0), UserController.getUsers)
router.get('/:id', validateRole(0), UserController.getUser);
router.post('/changeRole', validateRole(0), UserController.changeRole);

export default router