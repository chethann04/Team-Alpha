const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ['idle', 'active', 'offline'],
        default: 'offline'
    },
    karma: { type: Number, default: 0 },
    badges: [String],
    completedRescues: { type: Number, default: 0 },
    currentLocation: {
        lat: Number,
        lng: Number
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rider', RiderSchema);