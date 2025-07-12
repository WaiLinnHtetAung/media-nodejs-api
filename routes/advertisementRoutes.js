import express from "express";
import AdvertisementController from "../controllers/AdvertisementController.js";
import {saveSingleFile, validateRole, verifyToken} from "../utils/facades.js";

const router = express.Router();

router.get('/', verifyToken, validateRole(0), AdvertisementController.index);
router.post('/', verifyToken, validateRole(0), saveSingleFile, AdvertisementController.store);
router.delete('/:id', verifyToken, validateRole(0), AdvertisementController.drop)
router.patch('/:id', verifyToken, validateRole(0), saveSingleFile, AdvertisementController.update);

export default router;