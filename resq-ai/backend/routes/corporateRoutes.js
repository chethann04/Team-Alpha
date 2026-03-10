const express = require('express');
const router = express.Router();
const corporateController = require('../controllers/corporateController');

router.post('/predict-surplus', corporateController.predictSurplus);
router.get('/dashboard/:name', corporateController.getDashboard);

module.exports = router;