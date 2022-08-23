module.exports = async (Sequelize, DataTypes, sequelize) => {

    const setting = await sequelize.define('setting', {
        // Model attributes are defined here
        setting_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        setting_value: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
         timestamps: false 
    });
    

    console.log(setting === sequelize.models.setting); // true
   
    await sequelize.sync();
    
    // adding default blog SettingValue
    const website_title = await setting.create({
        setting_name: "website_title",
        setting_value: "express blog"
    });
    const website_description = await setting.create({
        setting_name: "website_description",
        setting_value: "wellcome"
    });
    const post_per_page = await setting.create({
        setting_name: "post_per_page",
        setting_value: 10
    });
    const users_can_register = await setting.create({
        setting_name: "users_can_register",
        setting_value: 1
    });
    const users_can_submit_comment = await setting.create({
        setting_name: "users_can_submit_comment",
        setting_value: 1
    });
    
    

}