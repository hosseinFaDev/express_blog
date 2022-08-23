const mysql = require('./mysql');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

//sequelize models
const users = require('./sequelizeModels/users')(Sequelize, DataTypes, sequelize);
const comments = require('./sequelizeModels/comments')(Sequelize, DataTypes, sequelize);
const posts = require('./sequelizeModels/posts')(Sequelize, DataTypes, sequelize);
const settings = require('./sequelizeModels/settings')(Sequelize, DataTypes, sequelize);

(async () => {
    await sequelize.sync();
})();

// // set default blog settings
// const website_title = await settings.create({
//     setting_name: "website_title",
//     setting_value: "express blog"
// });
// const website_description = await settings.create({
//     setting_name: "website_description",
//     setting_value: "wellcome"
// });
// const post_per_page = await settings.create({
//     setting_name: "post_per_page",
//     setting_value: 10
// });
// const users_can_register = await settings.create({
//     setting_name: "users_can_register",
//     setting_value: 1
// });
// const users_can_submit_comment = await settings.create({
//     setting_name: "users_can_submit_comment",
//     setting_value: 1
// });



