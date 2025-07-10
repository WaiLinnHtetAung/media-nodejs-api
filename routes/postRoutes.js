import express from 'express';
import PostController from "../controllers/PostController.js";
import {validateBody, validateRole, postSchema, verifyToken, saveMultipleFiles} from '../utils/facades.js'

const router = express.Router();

router.post('/', validateBody(postSchema.store), verifyToken, validateRole(1), saveMultipleFiles,  PostController.store);

export default router;