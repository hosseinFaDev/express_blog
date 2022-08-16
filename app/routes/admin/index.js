const express = require('express');
const router = express.Router();

//routers
const dashboardRouter = require('./dashboard');
const postsRouter = require('./post');
const commentRouter = require('./comments');
const usersRouter = require('./users');
const settingRouter = require('./settings');

router.use('/dashboard',dashboardRouter);
router.use('/posts',postsRouter);
router.use('/comments',commentRouter);
router.use('/users',usersRouter);
router.use('/settings',settingRouter);
module.exports = router;