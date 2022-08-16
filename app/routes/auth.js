const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/index');


router.get('/loggin',authControllers.showLoggin);
router.post('/loggin',authControllers.doLoggin);
router.get('/register',authControllers.showRegister);
router.post('/register',authControllers.doRegister);


module.exports = router;