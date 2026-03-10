const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    foodItem: { type: String },
    foodItems: [{ name: String, quantity: String, unit: String }],
    quantity: { type: String },
    kgFood: { type: Number },
    expiryDate: { type: Date },
    status: {
        type: String,
        enum: ['pending', 'verified', 'accepted', 'collected', 'delivered', 'expired', 'rejected'],
        default: 'pending'
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    impact: {
        co2Saved: { type: Number, default: 0 },
        co2Prevented: { type: Number, default: 0 },
        mealsFed: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);