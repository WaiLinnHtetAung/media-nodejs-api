import express from "express"
import UserController from "../controllers/UserController.js"
import {validateBody, validateRole, userSchema, verifyToken} from '../utils/facades.js'

const router = express.Router()

router.get('/paginate/:pageIndex', verifyToken, validateRole(0), UserController.getUsers)
router.post('/changeRole', verifyToken, validateRole(0), UserController.changeRole);
router.get('/users/:id', verifyToken, validateRole(0), UserController.getUser);

export default router