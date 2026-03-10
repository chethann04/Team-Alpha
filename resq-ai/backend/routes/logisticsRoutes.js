const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');

router.get('/route', logisticsController.getOptimalRoute);
router.post('/assign', logisticsController.assignDriver);

module.exports = router;