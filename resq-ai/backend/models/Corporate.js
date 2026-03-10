const mongoose = require('mongoose');

const CorporateSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactPerson: String,
    surplusPredictions: [{
        date: Date,
        predictedQuantity: Number,
        actualQuantity: Number
    }],
    impactMetrics: {
        totalCo2Saved: { type: Number, default: 0 },
        mealsFed: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Corporate', CorporateSchema);