const getCertificateTemplate = (name, impact) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { color: #63b3ed; font-size: 24px; font-weight: bold; }
        .content { color: #4a5568; line-height: 1.6; }
        .highlight { color: #68d391; font-weight: bold; }
        .footer { margin-top: 40px; font-size: 12px; color: #a0aec0; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ResQ-AI</div>
            <h1>Certificate of Impact</h1>
        </div>
        <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for your incredible contribution to our zero-waste mission. Your recent donation has made a tangible difference.</p>
            <p><strong>Impact Summary:</strong></p>
            <ul>
                <li>Food Rescued: <span class="highlight">${impact} kg</span></li>
                <li>CO2 Prevented: <span class="highlight">${(impact * 2.5).toFixed(2)} kg</span></li>
            </ul>
            <p>You are a true ResQ Hero! 🚴‍♂️🌍</p>
        </div>
        <div class="footer">
            &copy; 2025 ResQ-AI. Built for a zero-waste world.
        </div>
    </div>
</body>
</html>
`;

const getAlertTemplate = (ngoName, urgency, location) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: Arial, sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; border: 2px solid #fc8181; border-radius: 12px; }
        .urgency { color: #e53e3e; font-weight: bold; text-transform: uppercase; }
        .button { display: inline-block; padding: 12px 24px; background: #63b3ed; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="margin-top:0">🚨 Rescue Emergency</h2>
        <p>A nearby partner, <strong>${ngoName}</strong>, has a <span class="urgency">${urgency}</span> requirement for surplus food.</p>
        <p><strong>Location:</strong> ${location}</p>
        <a href="http://localhost:5173/rider" class="button">Accept Mission</a>
    </div>
</body>
</html>
`;

const getFoodDonationTemplate = (donorName, foodItem, quantity, location) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 24px; background: #ffffff; border: 1px solid #f1f5f9; }
        .header { background: #10b981; padding: 30px; border-radius: 20px 20px 0 0; text-align: center; color: white; }
        .content { padding: 30px; color: #334155; line-height: 1.6; }
        .detail-card { background: #f8fafc; padding: 20px; border-radius: 16px; margin: 20px 0; border-left: 4px solid #10b981; }
        .cta { display: block; text-align: center; padding: 18px; background: #10b981; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; margin-top: 30px; }
        .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Food Available! 🍱</h2>
        </div>
        <div class="content">
            <p>A new food donation has been posted by <strong>${donorName}</strong> and is ready for recovery.</p>
            <div class="detail-card">
                <p><strong>Item:</strong> ${foodItem}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Location:</strong> ${location}</p>
            </div>
            <a href="http://localhost:5173/ngo" class="cta">Review and Claim Donation</a>
        </div>
        <div class="footer">&copy; 2025 ResQ-AI Network</div>
    </div>
</body>
</html>
`;

const getDeliveryRequestTemplate = (donorName, foodItem, quantity, pickupLocation) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 24px; background: #ffffff; border: 1px solid #f1f5f9; }
        .header { background: #0ea5e9; padding: 30px; border-radius: 20px 20px 0 0; text-align: center; color: white; }
        .content { padding: 30px; color: #334155; line-height: 1.6; }
        .detail-card { background: #f0f9ff; padding: 20px; border-radius: 16px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
        .cta { display: block; text-align: center; padding: 18px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; margin-top: 30px; }
        .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Delivery Mission Available! 🚴‍♂️</h2>
        </div>
        <div class="content">
            <p>A confirmed donation is ready for pickup. Establish the link between surplus and need!</p>
            <div class="detail-card">
                <p><strong>From:</strong> ${donorName}</p>
                <p><strong>Item:</strong> ${foodItem} (${quantity})</p>
                <p><strong>Pickup:</strong> ${pickupLocation}</p>
            </div>
            <a href="http://localhost:5173/rider" class="cta">Accept Mission</a>
        </div>
        <div class="footer">&copy; 2025 ResQ-AI Network</div>
    </div>
</body>
</html>
`;

module.exports = {
    getCertificateTemplate,
    getAlertTemplate,
    getFoodDonationTemplate,
    getDeliveryRequestTemplate
};