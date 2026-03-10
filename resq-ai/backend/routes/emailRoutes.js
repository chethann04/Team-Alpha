const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-certificate', emailController.sendCertificate);
router.post('/send-alert', emailController.sendAlert);

module.exports = router;