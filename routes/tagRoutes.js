import express from 'express';
import TagController from "../controllers/TagController.js";
import {verifyToken, validateRole, validateBody} from "../middleware/verifyToken.js";
import {tagSchema} from "../utils/facades.js";

const router = express.Router();

router.post('/', validateBody(tagSchema.store), verifyToken, validateRole(0), TagController.store)
router.get('/:id', verifyToken, TagController.getTag);
router.patch('/:id', verifyToken, TagController.update);
router.delete('/:id', verifyToken, TagController.drop);

export default router;