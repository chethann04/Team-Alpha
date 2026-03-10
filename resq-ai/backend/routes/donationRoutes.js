const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/verify', donationController.verifyDonation);
router.post('/', donationController.createDonation);
router.get('/', donationController.getAllDonations);
router.patch('/:id/status', donationController.updateStatus);

module.exports = router;