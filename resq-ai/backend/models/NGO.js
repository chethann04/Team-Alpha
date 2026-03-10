const mongoose = require('mongoose');

const NGOSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: String,
    contact: String,
    requirements: {
        mealsNeeded: Number,
        urgency: {
            type: String,
            enum: ['low', 'medium', 'high', 'emergency'],
            default: 'medium'
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NGO', NGOSchema);