const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const NGO = require('./models/NGO');

const seedNGO = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');
        console.log('Connected to MongoDB');

        const ngoEmail = 'sttsupdates@gmail.com';
        const existingNGO = await NGO.findOne({ email: ngoEmail });

        if (existingNGO) {
            console.log(`NGO with email ${ngoEmail} already exists.`);
        } else {
            const newNGO = new NGO({
                name: 'Main NGO Hub',
                email: ngoEmail,
                address: 'Bangalore Operations Center',
                contact: '+91 9999999999',
                requirements: {
                    mealsNeeded: 500,
                    urgency: 'high'
                }
            });
            await newNGO.save();
            console.log(`NGO with email ${ngoEmail} seeded successfully.`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding NGO:', error);
        process.exit(1);
    }
};

seedNGO();
