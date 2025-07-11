import express from 'express';
import PostController from "../controllers/PostController.js";
import {validateBody, validateRole, postSchema, verifyToken, saveMultipleFiles} from '../utils/facades.js'

const router = express.Router();

router.get('/:index', PostController.index);
router.post('/', validateBody(postSchema.store), verifyToken, validateRole(1), saveMultipleFiles,  PostController.store);
router.patch('/:id', verifyToken, validateRole(1), saveMultipleFiles, PostController.update);

export default router;