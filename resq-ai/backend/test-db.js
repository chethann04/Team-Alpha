const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Donation = require('./models/Donation');

dotenv.config();

const testMongo = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');
        console.log('Connected to MongoDB');

        const testDonation = new Donation({
            donorName: 'Test Donor ' + Date.now(),
            status: 'verified',
            foodItem: 'Test Food',
            kgFood: 1
        });

        await testDonation.save();
        console.log('Saved test donation:', testDonation._id);

        const found = await Donation.findById(testDonation._id);
        console.log('Retrieved test donation:', found.donorName);

        process.exit(0);
    } catch (error) {
        console.error('Mongo Test Error:', error);
        process.exit(1);
    }
};

testMongo();
