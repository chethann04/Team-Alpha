const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngoController');

router.post('/match-demand', ngoController.matchDemand);
router.get('/', ngoController.getAllNGOs);
router.post('/', ngoController.createNGO);

module.exports = router;