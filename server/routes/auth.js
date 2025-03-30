import express from 'express';
import { loginUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;