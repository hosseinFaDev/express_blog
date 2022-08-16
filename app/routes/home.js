const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/front/home');


router.get('/',homeControllers.index)

module.exports = router ;