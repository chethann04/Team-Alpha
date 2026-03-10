const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Donation = require('./models/Donation');

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');
        const count = await Donation.countDocuments();
        console.log('Total Donations in DB:', count);

        if (count > 0) {
            const last = await Donation.findOne().sort({ createdAt: -1 });
            console.log('Last Donation:', JSON.stringify(last, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error('Check Error:', error);
        process.exit(1);
    }
};

checkData();
