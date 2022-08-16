const userModel = require('../models/user/index');
const hashservice = require('../services/hashServices');
const userRole = require('../models/userRoles');

exports.loggin = async (email, plainPassword) => {


    const user = await userModel.findAllByEmail(email);
    if (!user) {
        return false;
    }
    const { password } = user;
    return hashservice.comparePassword(plainPassword, password) ? user : false;

}

exports.register = async (email, password, password_confirmation) => {

    const user = await userModel.create({
        full_name :'کاربر ناشناس',
        email,
        password,
        role : userRole.USER
    });
    return user.insetId;
}