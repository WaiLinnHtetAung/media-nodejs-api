import express from 'express';
import PostController from "../controllers/PostController.js";
import {
    validateBody,
    validateRole,
    postSchema,
    verifyToken,
    saveMultipleFiles,
    validateStaff
} from '../utils/facades.js'

const router = express.Router();

router.post('/', validateBody(postSchema.store), verifyToken, validateRole(1), saveMultipleFiles,  PostController.store);
router.patch('/:id', verifyToken, validateRole(1), saveMultipleFiles, PostController.update);
router.delete('/:id', verifyToken, validateStaff, PostController.drop);

export default router;