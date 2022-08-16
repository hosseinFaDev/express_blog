const userModel = require('../../models/user');
const userValidator = require('../../validators/user');
const role = require('../../models/user/role');

exports.index = async (req, res) => {
    const users = await userModel.findAll();
    res.newRender('admin/users/index', { layout: 'admin', users })
}

exports.create = async (req, res) => {
    res.newRender('admin/users/create', { layout: 'admin' });
}

exports.store = async (req, res) => {
    let hasError = false;
    const data = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    const errors = userValidator.create(data);
    errors.length > 0 ? hasError = true : hasError = false;


    if (hasError) {
        return res.newRender('admin/users/create', { layout: 'admin', errors, hasError });
    }
    const result = await userModel.create(data);
    if (result) {
        res.redirect('/admin/users');

    }
}

exports.remove = async (req, res) => {
    const userID = req.params.userID;
    if (parseInt(userID) === 0) {
        return res.redirect('/admin/users');
    }
    const result = await userModel.delete(userID);
    return res.redirect('/admin/users');
}

exports.edit = async (req, res) => {
    const userID = req.params.userID;
    if (parseInt(userID) === 0) {
        return res.redirect('/admin/users');
    }
    const user = await userModel.find(userID);
    res.newRender('admin/users/edit', {
        layout: 'admin', user, userRole: role.userRole, helpers: {
            isSelectedRole: function (roleInput, options) {
                console.log(roleInput)
                return user.role === roleInput ? options.fn(this) : options.inverse(this);
            }
        }
    });
}


exports.update = async (req, res) => {
    const userID = req.params.userID;
    const data = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    const result = await userModel.update(userID, data);
    return res.redirect('/admin/users');
}