const Admin = require('../models/Admin');

exports.getStats = async (req, res) => {
    try {
        res.status(200).json({
            activeDonations: 12,
            totalRiders: 45,
            totalNGOs: 18,
            impact: {
                mealsSaved: 48320,
                co2Saved: 19328
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getWasteAnalytics = async (req, res) => {
    try {
        res.status(200).json({
            wastePrevented: '450kg',
            topDonors: ['Canteen A', 'Canteen B'],
            trends: [
                { month: 'Jan', amount: 400 },
                { month: 'Feb', amount: 450 }
            ]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};