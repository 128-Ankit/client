import asyncHandler from 'express-async-handler';
import Portfolio from '../models/Portfolio.js';
import Template from '../models/Template.js';
import generateUniqueSlug from '../utils/generateUrl.js';

// @desc    Get all portfolios for the authenticated user
// @route   GET /api/portfolios
// @access  Private
const getUserPortfolios = asyncHandler(async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ user: req.user._id }).populate('baseTemplate');
        res.json(portfolios);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || 'Error fetching portfolios');
    }
});

// @desc    Get portfolio by ID
// @route   GET /api/portfolios/:id
// @access  Private
const getPortfolioById = asyncHandler(async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id).populate('baseTemplate');

        if (!portfolio) {
            res.status(404);
            throw new Error('Portfolio not found');
        }

        // Check ownership
        if (portfolio.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Not authorized to access this portfolio');
        }

        res.json(portfolio);
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message || 'Error fetching portfolio');
    }
});

// @desc    Get portfolio by slug (public view)
// @route   GET /api/portfolios/view/:slug
// @access  Public
const getPortfolioBySlug = asyncHandler(async (req, res) => {
    try {
        const { slug } = req.params;
        console.log("slug: ", slug);
        const portfolio = await Portfolio.findOne({ slug }).populate('user', ['name', 'avatar']);

        console.log("portfolio: ", portfolio);

        if (!portfolio) {
            res.status(404);
            throw new Error('Portfolio not found');
        }

        // Increment view count
        portfolio.viewCount += 1;
        await portfolio.save();

        res.json(portfolio);
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message || 'Error fetching portfolio by slug');
    }
});

// @desc    Create a portfolio from a template
// @route   POST /api/portfolios
// @access  Private
const createPortfolio = asyncHandler(async (req, res) => {
    try {
        const { templateId, name } = req.body;

        if (!templateId || !name) {
            res.status(400);
            throw new Error('Template ID and portfolio name are required');
        }

        // Find the template
        const template = await Template.findById(templateId);
        if (!template) {
            res.status(404);
            throw new Error('Template not found');
        }

        // Generate a unique slug
        const slug = await generateUniqueSlug(req.user._id, name);

        // Create portfolio
        const portfolio = await Portfolio.create({
            user: req.user._id,
            name,
            baseTemplate: templateId,
            slug,
            sections: template.sections,
            theme: template.theme,
            published: false
        });
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(error.status || 400);
        throw new Error(error.message || 'Error creating portfolio');
    }
});

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
const updatePortfolio = asyncHandler(async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            res.status(404);
            throw new Error('Portfolio not found');
        }

        // Check ownership
        if (portfolio.user.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to update this portfolio');
        }

        // Update fields
        const { name, sections, theme, published, seo, analytics, customDomain } = req.body;

        if (name) {
            portfolio.name = name;
            // Update slug if name changes
            portfolio.slug = await generateUniqueSlug(req.user._id, name);
        }

        if (sections) portfolio.sections = sections;
        if (theme) portfolio.theme = theme;
        if (published !== undefined) portfolio.published = published;
        if (seo) portfolio.seo = seo;
        if (analytics) portfolio.analytics = analytics;
        if (customDomain) portfolio.customDomain = customDomain;

        const updatedPortfolio = await portfolio.save();
        res.json(updatedPortfolio);
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message || 'Error updating portfolio');
    }
});

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
const deletePortfolio = asyncHandler(async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            res.status(404);
            throw new Error('Portfolio not found');
        }

        // Check ownership
        if (portfolio.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(403);
            throw new Error('Not authorized to delete this portfolio');
        }

        await portfolio.deleteOne();
        res.json({ message: 'Portfolio removed' });
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message || 'Error deleting portfolio');
    }
});

export {
    getUserPortfolios,
    getPortfolioById,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
};