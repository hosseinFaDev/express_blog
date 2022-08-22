const adminRouter = require('./admin');
const authRouter =require('./auth');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');
const admin = require('../middlewares/admin');
const authControllers = require('../controllers/auth/index');
const front = require('./front');

module.exports = (app) => {
app.use('/admin',[auth,admin],adminRouter);
app.use('/auth',[guest],authRouter);
app.get('/loggout',authControllers.loggout)
app.use('/',front);
};
