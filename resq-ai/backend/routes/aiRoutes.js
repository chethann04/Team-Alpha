const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/shelf-life', aiController.getShelfLife);
router.post('/image-check', upload.single('image'), aiController.checkImage);
router.post('/waste-predict', aiController.predictWaste);

module.exports = router;