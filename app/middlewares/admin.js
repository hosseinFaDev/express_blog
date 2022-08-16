const userRole  = require('../models/userRoles');
module.exports = (req, res, next) => {

    if (req.session.user.role !== userRole.ADMIN) {
        res.redirect('/');
    }
    next();
}