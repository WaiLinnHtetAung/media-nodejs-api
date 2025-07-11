import express from 'express';
import {saveSingleFile, verifyToken} from "../utils/facades.js";
import CommentController from "../controllers/CommentController.js";

const router = express.Router();

router.get('/:id', verifyToken, CommentController.getByPost);
router.post('/', verifyToken, saveSingleFile, CommentController.store);

export default router;