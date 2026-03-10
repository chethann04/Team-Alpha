const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Rider     = require('./models/Rider');
const NGO       = require('./models/NGO');
const Community = require('./models/Community');
const Donation  = require('./models/Donation');
const Corporate = require('./models/Corporate');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🔗 Connected to MongoDB for seeding...');

  // Clear all collections
  await Promise.all([
    Rider.deleteMany({}),
    NGO.deleteMany({}),
    Community.deleteMany({}),
    Donation.deleteMany({}),
    Corporate.deleteMany({}),
  ]);
  console.log('🧹 Cleared existing data');

  // Seed Riders
  const riders = await Rider.insertMany([
    {
      name: 'Arjun Sharma',
      phone: '9876543210',
      email: 'arjun@resqai.com',
      karmaPoints: 840,
      totalPickups: 62,
      totalDeliveries: 62,
      badges: ['Food Hero', 'CSR Champion', 'Climate Warrior'],
      status: 'available',
      currentLocation: { lat: 12.9716, lng: 77.5946 },
    },
    {
      name: 'Priya Nair',
      phone: '9876543211',
      email: 'priya@resqai.com',
      karmaPoints: 620,
      totalPickups: 45,
      totalDeliveries: 45,
      badges: ['Food Hero', 'CSR Champion'],
      status: 'available',
      currentLocation: { lat: 12.9352, lng: 77.6245 },
    },
    {
      name: 'Rahul Das',
      phone: '9876543212',
      karmaPoints: 410,
      totalPickups: 30,
      totalDeliveries: 30,
      badges: ['Food Hero'],
      status: 'available',
      currentLocation: { lat: 12.9698, lng: 77.7499 },
    },
    {
      name: 'Sneha Iyer',
      phone: '9876543213',
      karmaPoints: 290,
      totalPickups: 20,
      totalDeliveries: 20,
      badges: ['Food Hero'],
      status: 'available',
    },
    {
      name: 'Kiran Reddy',
      phone: '9876543214',
      karmaPoints: 150,
      totalPickups: 11,
      totalDeliveries: 11,
      badges: [],
      status: 'available',
    },
  ]);
  console.log(`✅ Seeded ${riders.length} riders`);

  // Seed NGOs
  const ngos = await NGO.insertMany([
    {
      name: 'Hope Foundation',
      location: {
        address: 'Koramangala, Bangalore',
        lat: 12.9352,
        lng: 77.6245,
      },
      mealsRequired: 200,
      foodPreference: ['vegetarian', 'rice', 'dal'],
      urgency: 'critical',
      contact: '9876540001',
      email: 'hope@foundation.org',
    },
    {
      name: 'Aasha Shelter',
      location: {
        address: 'Jayanagar, Bangalore',
        lat: 12.9254,
        lng: 77.5830,
      },
      mealsRequired: 80,
      foodPreference: ['any'],
      urgency: 'medium',
      contact: '9876540002',
    },
    {
      name: 'Green Light Trust',
      location: {
        address: 'Hebbal, Bangalore',
        lat: 13.0358,
        lng: 77.5970,
      },
      mealsRequired: 30,
      foodPreference: ['bread', 'snacks'],
      urgency: 'low',
      contact: '9876540003',
    },
  ]);
  console.log(`✅ Seeded ${ngos.length} NGOs`);

  // Seed Corporate
  const corporates = await Corporate.insertMany([
    {
      companyName: 'TechCorp',
      contactEmail: 'csr@techcorp.com',
      dailyMealSchedule: [
        { meal: 'Breakfast', quantity: 200, time: '8:00 AM' },
        { meal: 'Lunch',     quantity: 450, time: '1:00 PM' },
        { meal: 'Snacks',    quantity: 100, time: '4:00 PM' },
      ],
      predictedSurplus: 75,
      totalDonated: 1868,
      totalMealsFed: 4670,
      co2Prevented: 4670,
      employeeVolunteers: 48,
      ngosSupported: ['Hope Foundation', 'Aasha Shelter'],
      csrBadge: 'gold',
    },
  ]);
  console.log(`✅ Seeded ${corporates.length} corporates`);

  // Seed Donations
  const donations = await Donation.insertMany([
    {
      donorName: 'Sunrise Restaurant',
      donorType: 'restaurant',
      foodItems: [
        { name: 'Rice',      quantity: 5, unit: 'kg' },
        { name: 'Dal Fry',   quantity: 3, unit: 'kg' },
        { name: 'Chapati',   quantity: 4, unit: 'kg' },
      ],
      preparationTime: 1,
      temperature: 'hot',
      smell: 'normal',
      packing: 'sealed',
      riskScore: 95,
      status: 'verified',
      location: {
        address: 'MG Road, Bangalore',
        lat: 12.9716,
        lng: 77.5946,
      },
      kgFood: 12,
      mealsFed: 30,
      co2Prevented: 30,
      qrCode: 'RESQ-QR-001-DEMO',
      isCorporate: false,
    },
    {
      donorName: 'TechCorp Canteen',
      donorType: 'corporate',
      foodItems: [{ name: 'Cooked Meals', quantity: 45, unit: 'kg' }],
      preparationTime: 0.5,
      temperature: 'hot',
      smell: 'normal',
      packing: 'sealed',
      riskScore: 98,
      status: 'in_transit',
      location: {
        address: 'Whitefield, Bangalore',
        lat: 12.9698,
        lng: 77.7499,
      },
      assignedRider: riders[0]._id,
      assignedNGO:   ngos[0]._id,
      kgFood: 45,
      mealsFed: 112,
      co2Prevented: 112.5,
      qrCode: 'RESQ-QR-002-DEMO',
      isCorporate: true,
      corporateName: 'TechCorp',
      csrTagged: true,
    },
    {
      donorName: 'Green Bites Cafe',
      donorType: 'restaurant',
      foodItems: [
        { name: 'Bread', quantity: 3, unit: 'kg' },
        { name: 'Soup',  quantity: 5, unit: 'kg' },
      ],
      preparationTime: 2,
      temperature: 'cold',
      smell: 'normal',
      packing: 'sealed',
      riskScore: 88,
      status: 'delivered',
      location: {
        address: 'Indiranagar, Bangalore',
        lat: 12.9784,
        lng: 77.6408,
      },
      kgFood: 8,
      mealsFed: 20,
      co2Prevented: 20,
      qrCode: 'RESQ-QR-003-DEMO',
      isCorporate: false,
    },
  ]);
  console.log(`✅ Seeded ${donations.length} donations`);

  // Seed Community Posts
  const posts = await Community.insertMany([
    {
      authorName: 'TechCorp Canteen',
      authorRole: 'corporate',
      postType: 'corporate_impact',
      content:
        'Today our canteen rescued 112 meals that would have gone to waste. 45kg of food is now feeding families in need. Proud of our team! 🌱 #ZeroWaste #CSR #ResQAI',
      likes: 87,
      comments: [
        { author: 'Arjun Sharma',  text: 'Amazing work! This is what CSR should look like 👏' },
        { author: 'Hope Foundation', text: 'Thank you so much from our end 🙏' },
      ],
      isAutoGenerated: false,
      tags: ['csr', 'corporate', 'zerowaste'],
    },
    {
      authorName: 'Arjun Sharma',
      authorRole: 'rider',
      postType: 'rescue_selfie',
      content:
        'Just completed my 60th rescue mission! Feeling incredible knowing every ride makes a difference. 200 families fed this month alone. 🚴‍♂️ #FoodHero #ResQAI #ClimateWarrior',
      likes: 143,
      comments: [
        { author: 'Priya Nair', text: 'Incredible! You inspire all of us 🌟' },
      ],
      isAutoGenerated: false,
      tags: ['rider', 'rescue', 'hero'],
    },
    {
      authorName: 'Hope Foundation',
      authorRole: 'ngo',
      postType: 'donation_story',
      content:
        'Thanks to ResQ-AI and our amazing donors, we fed 200 people today. Every meal matters. Every act of kindness ripples out and changes lives. 🙏 #ZeroHunger #SDG2',
      likes: 201,
      comments: [
        { author: 'Priya Nair',      text: 'Keep up the incredible work!' },
        { author: 'TechCorp Team',   text: 'Honored to be your partner ❤️' },
      ],
      isAutoGenerated: false,
      tags: ['ngo', 'hunger', 'sdg2'],
    },
    {
      authorName: 'ResQ-AI System',
      authorRole: 'community',
      postType: 'achievement_badge',
      content:
        '🏆 Milestone Alert! ResQ-AI community has collectively prevented 48,320 kg of CO2 this month. That\'s equivalent to planting 2,416 trees! Thank you to every donor, rider, and NGO. 🌳',
      likes: 412,
      comments: [],
      isAutoGenerated: true,
      tags: ['milestone', 'co2', 'impact'],
    },
  ]);
  console.log(`✅ Seeded ${posts.length} community posts`);

  console.log('\n🎉 All demo data seeded successfully!');
  console.log('🚀 ResQ-AI is ready to demo!\n');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});