import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import { verifyToken, validateRole } from "../middleware/verifyToken.js";
import {saveSingleFile} from '../utils/facades.js'

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', verifyToken, validateRole(0), saveSingleFile, CategoryController.store);
router.patch('/update/:id', verifyToken, validateRole(0), CategoryController.update);
router.delete('/:id', verifyToken, validateRole(0), CategoryController.drop);

export default router;