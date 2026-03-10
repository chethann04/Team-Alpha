const Rider = require('../models/Rider');
const Donation = require('../models/Donation');

exports.getFeed = async (req, res) => {
    try {
        // Return all pending donations as a feed
        // Return both pending and accepted donations for the feed
        const feed = await Donation.find({
            status: { $in: ['pending', 'accepted'] }
        }).sort({ createdAt: -1 });
        res.status(200).json(feed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.acceptRescue = async (req, res) => {
    try {
        const { riderId, donationId } = req.body;
        const donation = await Donation.findByIdAndUpdate(donationId, { status: 'accepted' }, { new: true });
        res.status(200).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const riders = await Rider.find().sort({ karma: -1 }).limit(10);
        res.status(200).json(riders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRider = async (req, res) => {
    try {
        const rider = new Rider(req.body);
        await rider.save();
        res.status(201).json(rider);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};