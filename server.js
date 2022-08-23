require('dotenv').config();
require('./database/sequelize');
const startApplication = require('./app');
startApplication();
