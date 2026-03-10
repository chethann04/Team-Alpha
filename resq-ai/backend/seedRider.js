const mongoose = require('mongoose');
const Rider = require('./models/Rider');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resq-ai')
    .then(async () => {
        console.log('Connected to MongoDB');

        const riderEmail = 'chethannhs04@gmail.com';

        // Remove existing if any
        await Rider.deleteOne({ email: riderEmail });

        const newRider = new Rider({
            name: 'Sanvi Delivery Hero',
            email: riderEmail,
            status: 'idle',
            karma: 500,
            completedRescues: 12
        });

        await newRider.save();
        console.log(`Rider seeded: ${riderEmail}`);
        mongoose.connection.close();
    })
    .catch(err => console.error('Seeding error:', err));
