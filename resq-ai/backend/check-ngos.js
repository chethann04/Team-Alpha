const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NGO = require('./models/NGO');

dotenv.config();

const checkNGOs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai');
        const count = await NGO.countDocuments();
        console.log('Total NGOs in DB:', count);

        if (count > 0) {
            const all = await NGO.find({}, 'name email');
            console.log('NGOs:', JSON.stringify(all, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkNGOs();
