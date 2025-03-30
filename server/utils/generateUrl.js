import Portfolio from '../models/Portfolio.js';
import { nanoid } from 'nanoid';

const generateUniqueSlug = async (userId, portfolioName) => {
    // Create a slug from portfolio name
    const baseSlug = portfolioName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingPortfolio = await Portfolio.findOne({ slug: baseSlug });

    if (existingPortfolio) {
        // If exists, add a unique suffix
        return `${baseSlug}-${nanoid(6)}`;
    }

    return baseSlug;
};

export default generateUniqueSlug;