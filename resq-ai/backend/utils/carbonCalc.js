const calculateImpact = (quantity, category) => {
    // Simple multipliers for demo purposes
    const co2Factor = 2.5; // kg CO2 per kg food
    const mealFactor = 2; // meals per kg food

    return {
        co2Saved: quantity * co2Factor,
        mealsFed: Math.floor(quantity * mealFactor),
        treesSaved: (quantity * co2Factor) / 20 // 1 tree offsets ~20kg CO2/year
    };
};

module.exports = { calculateImpact };