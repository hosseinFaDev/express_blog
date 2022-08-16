const express = require('express');
const router = express.Router();
const commentControllers = require('../../controllers/admin/comments');

router.get('/',commentControllers.index);
router.get('/approve/:commentID',commentControllers.approve);
router.get('/reject/:commentID',commentControllers.reject);
router.get('/delete/:commentID',commentControllers.delete);



module.exports = router ;