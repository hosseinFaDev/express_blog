const settingModel = require('../../models/setting');

exports.index = async (req, res) => {
    const setting = await settingModel.findAll();
    const presentedSettings = {};
    setting.forEach((item) => {
        presentedSettings[item.setting_name] = item.setting_value
    });
    res.newRender('admin/settings/index', {
        layout: 'admin', setting, config: presentedSettings, helpers: {
               isChecked: function (value, options) {
                return parseInt(value) === 1 ? options.fn(this) : options.inverse(this);
            }
        }
    })
}

exports.store = async (req, res) => {
    const setting = req.body;
    let valitatedSetting = {};
    
    Object.keys(setting).forEach((setting_name) => {
        if (setting[setting_name] === 'on') {
            valitatedSetting[setting_name] = 1;
        } else {
            valitatedSetting[setting_name] = setting[setting_name];
        }
        
    });
    
    
    // FOR when we don't checked checkbox and we don'd have data from users
    if(valitatedSetting.users_can_register === undefined){
        valitatedSetting.users_can_register = 0;
    }
    
    if(valitatedSetting.users_can_submit_comment  === undefined){
        valitatedSetting.users_can_submit_comment = 0;
    }

    const result = await settingModel.update(valitatedSetting);
    res.redirect("/admin/settings")

}

