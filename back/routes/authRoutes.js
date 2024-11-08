import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { signup, login, logout } from '../controllers/authController.js';
const router = express.Router();
router.post('/signup',signup);
router.post('/login',protect, login);
router.get('/logout',protect,logout);
export default router;
