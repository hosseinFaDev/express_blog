const express = require('express');
const router = express.Router();
const homeControllers = require('../../controllers/front/home');


router.get('/',homeControllers.index);
router.get('/search',homeControllers.search);

module.exports = router ;