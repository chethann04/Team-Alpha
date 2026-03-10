const calculateKarma = (action, details) => {
    const points = {
        donation: 50,
        rescue: 100,
        communityPost: 10,
        like: 1
    };

    return points[action] || 0;
};

const getBadge = (totalKarma) => {
    if (totalKarma > 1000) return 'Eco Legend';
    if (totalKarma > 500) return 'Food Hero';
    if (totalKarma > 100) return 'Rescue Trainee';
    return 'Newbie';
};

module.exports = { calculateKarma, getBadge };