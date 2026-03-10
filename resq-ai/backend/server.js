const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/donate', require('./routes/donationRoutes'));
app.use('/api/rider', require('./routes/riderRoutes'));
app.use('/api/ngos', require('./routes/ngoRoutes'));
app.use('/api/corporate', require('./routes/corporateRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/email', require('./routes/emailRoutes'));
app.use('/api/logistics', require('./routes/logisticsRoutes'));

// Error Handler
app.use(require('./middleware/errorHandler'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'ResQ-AI API is running' });
});

// Basic 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});