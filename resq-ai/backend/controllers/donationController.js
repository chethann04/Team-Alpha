const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const Rider = require('../models/Rider');
const emailController = require('./emailController');

exports.createDonation = async (req, res) => {
    try {
        console.log('--- Incoming Donation Request ---');
        console.log('Payload:', JSON.stringify(req.body, null, 2));

        const donation = new Donation(req.body);
        await donation.save();
        console.log('Donation saved successfully:', donation._id);

        // Notify NGOs about new food availability
        const ngos = await NGO.find({}, 'email');
        const ngoEmails = ngos.map(ngo => ngo.email);
        if (ngoEmails.length > 0) {
            const foodSummary = donation.foodItem || (donation.foodItems && donation.foodItems.map(i => i.name).join(', ')) || 'Various Items';
            const quantitySummary = donation.kgFood ? `${donation.kgFood}kg` : donation.quantity || 'Unknown';

            emailController.sendDonationNotification(
                donation.donorName,
                foodSummary,
                quantitySummary,
                donation.location?.address || 'Location provided in app',
                ngoEmails
            );
        }

        // Notify Donor
        if (donation.donorEmail) {
            const foodSummary = donation.foodItem || (donation.foodItems && donation.foodItems.map(i => i.name).join(', ')) || 'Various Items';
            const quantitySummary = donation.kgFood ? `${donation.kgFood}kg` : donation.quantity || 'Unknown';

            emailController.sendDonorConfirmation(
                donation.donorName,
                donation.donorEmail,
                foodSummary,
                quantitySummary
            );
        }

        res.status(201).json(donation);
    } catch (error) {
        console.error('--- Donation Save Error ---');
        console.error(error);
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
                const foodSummary = donation.foodItem || (donation.foodItems && donation.foodItems.map(i => i.name).join(', ')) || 'Various Items';
                const quantitySummary = donation.kgFood ? `${donation.kgFood}kg` : donation.quantity || 'Unknown';

                emailController.sendDeliveryNotification(
                    donation.donorName,
                    foodSummary,
                    quantitySummary,
                    donation.location?.address || 'Location provided in app',
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