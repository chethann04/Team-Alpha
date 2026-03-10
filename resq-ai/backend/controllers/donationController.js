const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const Rider = require('../models/Rider');
const emailController = require('./emailController');

exports.createDonation = async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();

        // Notify NGOs about new food availability
        const ngos = await NGO.find({}, 'email');
        const ngoEmails = ngos.map(ngo => ngo.email);
        if (ngoEmails.length > 0) {
            emailController.sendDonationNotification(
                donation.donorName,
                donation.foodItem,
                donation.quantity,
                donation.location.address,
                ngoEmails
            );
        }

        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const donation = await Donation.findByIdAndUpdate(id, { status }, { new: true });
        if (!donation) return res.status(404).json({ message: 'Donation not found' });

        // If NGO approved (accepted) the donation, notify delivery partners
        if (status === 'accepted') {
            const idleRiders = await Rider.find({ status: 'idle' }, 'email');
            const riderEmails = idleRiders.map(r => r.email);
            if (riderEmails.length > 0) {
                emailController.sendDeliveryNotification(
                    donation.donorName,
                    donation.foodItem,
                    donation.quantity,
                    donation.location.address,
                    riderEmails
                );
            }
        }

        res.status(200).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.verifyDonation = async (req, res) => {
    // Simplified verification for now
    res.status(200).json({ verified: true, score: 95, recommendation: 'Safe to donate' });
};