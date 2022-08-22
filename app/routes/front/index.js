const express = require('express');
const router = express.Router();
const home = require('./home'); 
const post = require('./post'); 

//routers
router.use('/',home);
router.use('/',post);

module.exports = router ;