import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
    registerUser,
    getUsers,
    getUserById,
    updateUserProfile
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/profile', protect, updateUserProfile);

// router.route('/')
//     .post(registerUser)
//     .get(protect, admin, getUsers);

// router.route('/profile')
//     .put(protect, updateUserProfile);

// router.route('/:id')
//     .get(protect, admin, getUserById);

export default router;