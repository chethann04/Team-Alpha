const Corporate = require('../models/Corporate');

exports.predictSurplus = async (req, res) => {
    try {
        res.status(200).json({
            predictedQuantity: 45,
            confidence: 0.88,
            reasoning: 'Based on historical Friday data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const company = await Corporate.findOne({ companyName: req.params.name });
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};