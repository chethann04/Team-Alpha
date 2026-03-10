const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.post('/post', communityController.createPost);
router.get('/feed', communityController.getFeed);
router.patch('/:id/like', communityController.likePost);
router.post('/:id/comment', communityController.addComment);

module.exports = router;