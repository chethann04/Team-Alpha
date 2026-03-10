const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    author: {
        name: String,
        role: String,
        avatar: String
    },
    type: { type: String, enum: ['story', 'update', 'event'], default: 'story' },
    content: { type: String, required: true },
    image: String,
    likes: { type: Number, default: 0 },
    comments: [{
        user: String,
        text: String,
        date: { type: Date, default: Date.now }
    }],
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Community', CommunitySchema);