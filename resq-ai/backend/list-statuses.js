const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Donation = require('./models/Donation');

dotenv.config();

const listStatuses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');
        const all = await Donation.find({}, 'donorName status createdAt');
        console.log('--- Donation Statuses ---');
        all.forEach(d => {
            console.log(`[${d.createdAt.toISOString()}] ${d.status.padEnd(10)} | ${d.donorName}`);
        });
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listStatuses();
