import express from 'express';
import { validateRole, verifyToken} from "../utils/facades.js";
import CommentController from "../controllers/CommentController.js";

const router = express.Router();

router.post('/:id', verifyToken, validateRole(0), CommentController.update);
router.delete('/:id', verifyToken, validateRole(0), CommentController.drop);

export default router;