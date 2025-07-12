import express from 'express'
import AdvertisementController from "../controllers/AdvertisementController.js";
import CategoryController from "../controllers/CategoryController.js";
import CommentController from "../controllers/CommentController.js";
import PostController from "../controllers/PostController.js";
import {verifyToken, saveSingleFile, validateBody, userSchema, validateRole} from "../utils/facades.js";
import TagController from "../controllers/TagController.js";
import UserController from "../controllers/UserController.js";

const router = express.Router()

router.get('/advertisements', AdvertisementController.getActiveAdvs);
router.get('/categories', CategoryController.index);
router.get('/tags/', TagController.index);

// comments
router.get('/comments/:id', verifyToken, CommentController.getByPost);
router.post('/comments/', verifyToken, saveSingleFile, CommentController.store);

// posts
router.get('/posts/:index', PostController.index);
router.get('/posts/tag/:id/:index', PostController.getByTag);
router.get('/posts/category/:id/:index', PostController.getByCategory)
router.get('/posts/author/:id/:index', PostController.getByAuthor);


// user
router.post('/users/register', validateBody(userSchema.registerSchema) ,UserController.register);
router.post('/users/login', validateBody(userSchema.loginSchema) ,UserController.login);
router.get('/users/:id', verifyToken, UserController.getUserDetail);

export default router