const NGO = require('../models/NGO');

exports.matchDemand = async (req, res) => {
    try {
        const { mealsNeeded } = req.body;
        // Simple matching logic: find NGOs with similar requirements
        const matchedNGOs = await NGO.find({
            'requirements.mealsNeeded': { $gte: mealsNeeded }
        });
        res.status(200).json(matchedNGOs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllNGOs = async (req, res) => {
    try {
        const ngos = await NGO.find();
        res.status(200).json(ngos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNGO = async (req, res) => {
    try {
        const ngo = new NGO(req.body);
        await ngo.save();
        res.status(201).json(ngo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};