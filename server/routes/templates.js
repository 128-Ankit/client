import express from 'express';
import {
    getTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate
} from '../controllers/templateController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getTemplates)
    .post(protect, admin, createTemplate);

//pass template id to update
router.route('/:id')
    .get(getTemplateById)
    .put(protect, admin, updateTemplate);

export default router;