import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
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
});

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    thumbnail: {
        type: String
    },
    sections: {
        type: [SectionSchema],
        default: [
            {
                name: 'Home',
                type: 'text',
                content: [],
                order: 1
            },
            {
                name: 'About',
                type: 'text',
                content: [],
                order: 2
            },
            {
                name: 'Services',
                type: 'text',
                content: [],
                order: 3
            },
            {
                name: 'Education',
                type: 'education',
                content: [],
                order: 4
            },
            {
                name: 'Projects',
                type: 'text',
                content: [],
                order: 5
            },
            {
                name: 'Contacts',
                type: 'contact',
                content: { email: '', phone: '', address: '' },
                order: 6
            }
        ]
    },
    theme: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            primaryColor: '#4A90E2',
            secondaryColor: '#50E3C2',
            fontFamily: 'Roboto',
            fontSize: '16px',
            backgroundColor: '#FFFFFF',
            textColor: '#333333'
        }
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['professional', 'creative', 'minimal', 'academic'],
        default: 'professional'
    }
}, {
    timestamps: true
});

const Template = mongoose.model('Template', TemplateSchema);

export default Template;
