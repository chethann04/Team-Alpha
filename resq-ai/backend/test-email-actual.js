const transporter = require('./config/email');
const { getFoodDonationTemplate } = require('./utils/emailTemplates');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './.env') });

const testEmail = async () => {
    try {
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS.replace(/\s/g, '');

        console.log('Testing email configuration...');
        console.log('Using Email:', emailUser);

        const transporter = require('nodemailer').createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        const mailOptions = {
            from: `"ResQ-AI Test" <${emailUser}>`,
            to: 'sttsupdates@gmail.com',
            subject: '🧪 ResQ-AI Implementation Test',
            html: getFoodDonationTemplate(
                'Test Donor',
                'Mixed Vegetables',
                '5kg',
                '123 Digital Street, Cloud City'
            )
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        process.exit(0);
    } catch (error) {
        console.error('❌ Email test failed:');
        console.error(error);
        process.exit(1);
    }
};

testEmail();
