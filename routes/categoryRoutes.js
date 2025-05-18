import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import { verifyToken, validateRole } from "../middleware/verifyToken.js";
import {saveSingleFile} from '../utils/facades.js'

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', verifyToken, validateRole(0), saveSingleFile, CategoryController.store);

export default router;