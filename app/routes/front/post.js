const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/front/post');
const commentController = require('../../controllers/front/comment');

router.get('/p/:postSlug',postsController.showPost);
router.post('/p/:post_slug/comments',commentController.store);

module.exports = router;