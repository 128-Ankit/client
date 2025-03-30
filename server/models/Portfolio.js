import mongoose from 'mongoose';
import slugify from 'slugify';

const PortfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Portfolio name is required'],
        trim: true
    },
    baseTemplate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    customDomain: {
        type: String,
        unique: true,
        sparse: true
    },
    sections: [
        {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                enum: ['text', 'image', 'gallery', 'contact', 'social', 'experience', 'skills', 'education', 'projects']
            },
            content: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            order: {
                type: Number,
                required: true
            },
            isActive: {
                type: Boolean,
                default: true
            },
            config: {
                type: mongoose.Schema.Types.Mixed,
                default: {}
            }
        }
    ],
    theme: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    seo: {
        title: String,
        description: String,
        keywords: [String]
    },
    analytics: {
        trackingId: String,
        enabled: {
            type: Boolean,
            default: false
        }
    },
    published: {
        type: Boolean,
        default: false
    },
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Generate slug before saving
PortfolioSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('name')) {
        const baseSlug = slugify(this.name, { lower: true });
        let slug = baseSlug;
        let counter = 1;

        // Check for existing slug
        let existingPortfolio = await mongoose.model('Portfolio').findOne({ slug });

        // If slug exists, append a counter until unique
        while (existingPortfolio) {
            slug = `${baseSlug}-${counter}`;
            counter++;
            existingPortfolio = await mongoose.model('Portfolio').findOne({ slug });
        }

        this.slug = slug;
    }

    next();
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;