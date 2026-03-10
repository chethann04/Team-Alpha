const transporter = require('../config/email');
const { getCertificateTemplate, getAlertTemplate } = require('../utils/emailTemplates');

exports.sendCertificate = async (req, res) => {
    try {
        const { email, name, impact } = req.body;

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('Email credentials missing. Skipping real email send.');
            return res.status(200).json({
                message: 'Email service simulated (Credentials missing)',
                simulated: true
            });
        }

        const mailOptions = {
            from: `"ResQ-AI Impact Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '📜 Your ResQ-AI Impact Certificate',
            html: getCertificateTemplate(name, impact)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Impact certificate sent:', info.messageId);

        res.status(200).json({
            message: 'Certificate sent successfully',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Nodemailer error:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

exports.sendAlert = async (req, res) => {
    try {
        const { ngoName, urgency, location, emails } = req.body;

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('Email credentials missing. Skipping real alert send.');
            return res.status(200).json({ message: 'Alert simulation successful' });
        }

        const mailOptions = {
            from: `"ResQ-AI Emergency" <${process.env.EMAIL_USER}>`,
            to: (emails || []).join(','),
            subject: `🚨 Emergency ResQ Required: ${ngoName}`,
            html: getAlertTemplate(ngoName, urgency, location)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Emergency alerts sent:', info.messageId);

        res.status(200).json({ message: 'Alerts dispatched successfully' });
    } catch (error) {
        console.error('Nodemailer error:', error);
        res.status(500).json({ message: 'Failed to dispatch alerts', error: error.message });
    }
};

exports.sendDonationNotification = async (donorName, foodItem, quantity, location, emails) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
        const mailOptions = {
            from: `"ResQ-AI Grid" <${process.env.EMAIL_USER}>`,
            to: emails.join(','),
            subject: '🍱 New Resource Available for Recovery',
            html: require('../utils/emailTemplates').getFoodDonationTemplate(donorName, foodItem, quantity, location)
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Donation notification error:', error);
    }
};

exports.sendDeliveryNotification = async (donorName, foodItem, quantity, pickupLocation, emails) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
        const mailOptions = {
            from: `"ResQ-AI Logistics" <${process.env.EMAIL_USER}>`,
            to: emails.join(','),
            subject: '🚴‍♂️ New Delivery Mission Dispatched',
            html: require('../utils/emailTemplates').getDeliveryRequestTemplate(donorName, foodItem, quantity, pickupLocation)
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Delivery notification error:', error);
    }
};

exports.sendDonorConfirmation = async (donorName, donorEmail, foodItem, quantity) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !donorEmail) return;
        const mailOptions = {
            from: `"ResQ-AI Support" <${process.env.EMAIL_USER}>`,
            to: donorEmail,
            subject: '✅ Your Donation is Logged - ResQ-AI',
            html: require('../utils/emailTemplates').getDonorConfirmationTemplate(donorName, foodItem, quantity)
        };
        await transporter.sendMail(mailOptions);
        console.log('Donor confirmation email sent to:', donorEmail);
    } catch (error) {
        console.error('Donor confirmation email error:', error);
    }
};