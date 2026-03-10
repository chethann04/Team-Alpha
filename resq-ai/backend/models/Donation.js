const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    foodItem: { type: String, required: true },
    quantity: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'collected', 'delivered', 'expired'],
        default: 'pending'
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    impact: {
        co2Saved: { type: Number, default: 0 },
        mealsFed: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);