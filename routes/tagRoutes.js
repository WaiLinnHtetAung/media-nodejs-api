import express from 'express';
import TagController from "../controllers/TagController.js";
import { verifyToken, validateRole} from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/', TagController.index);
router.post('/', verifyToken, validateRole(0), TagController.store)
router.get('/:id', verifyToken, TagController.getTag);

export default router;