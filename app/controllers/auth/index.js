const { userRole } = require('../../models/user/role');
const authServices = require('../../services/authServices');
const settingModel = require('../../models/setting');

exports.showLoggin = (req, res) => {
    res.render('auth/loggin', { layout: 'auth' });

}

exports.doLoggin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.loggin(email, password);
    if (!user) {
        // req.flash('error',['ایمیل یا کلمه عبور معتبر نمی باشد']);
        return res.redirect('/auth/loggin');
    }
    req.session.user = user;
    const pathToRedirect = user.role === userRole.ADMIN ? '/admin/dashboard' : '/';
    res.redirect(pathToRedirect);
}

exports.showRegister = async (req, res) => {
    const canUserRegister = parseInt(await settingModel.get('users_can_register'));
    if (canUserRegister){
        return res.render('auth/register', { layout: 'auth' });
    }
    res.send('sorry user register is temporary disable by admin')
}
exports.doRegister = async (req, res) => {
    const { email, password, password_confirmation } = req.body;
    const user = await authServices.register(email, password);
    return res.redirect('/auth/loggin');

}

exports.loggout = (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/auth/loggin');
    })
}