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

router.get('/:index', PostController.index);
router.post('/', validateBody(postSchema.store), verifyToken, validateRole(1), saveMultipleFiles,  PostController.store);
router.patch('/:id', verifyToken, validateRole(1), saveMultipleFiles, PostController.update);
router.delete('/:id', verifyToken, validateStaff, PostController.drop);
router.get('/tag/:id/:index', PostController.getByTag);
router.get('/category/:id/:index', PostController.getByCategory)
router.get('/author/:id/:index', PostController.getByAuthor);

export default router;