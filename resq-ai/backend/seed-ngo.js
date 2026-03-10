const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NGO = require('./models/NGO');

dotenv.config();

const seedNGO = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');

        const exists = await NGO.findOne({ email: 'sttsupdates@gmail.com' });
        if (exists) {
            console.log('NGO already exists');
        } else {
            const ngo = new NGO({
                name: 'ResQ Community Kitchen',
                email: 'sttsupdates@gmail.com',
                address: '123 Rescue Way, Bangalore',
                contact: '9876543210',
                requirements: {
                    mealsNeeded: 100,
                    urgency: 'high'
                }
            });
            await ngo.save();
            console.log('Seed NGO created:', ngo._id);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedNGO();
