const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');

router.get('/feed', riderController.getFeed);
router.post('/accept', riderController.acceptRescue);
router.post('/complete', riderController.completeRescue);
router.get('/leaderboard', riderController.getLeaderboard);
router.post('/', riderController.createRider);

module.exports = router;