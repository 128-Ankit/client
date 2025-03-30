import express from 'express';
import {
    getUserPortfolios,
    getPortfolioById,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, getUserPortfolios)
    .post(protect, createPortfolio);

router.route('/:id')
    .get(protect, getPortfolioById)
    .put(protect, updatePortfolio)
    .delete(protect, deletePortfolio);

router.get('/view/:slug', getPortfolioBySlug);

export default router;