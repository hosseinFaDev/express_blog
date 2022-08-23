module.exports = async (Sequelize, DataTypes, sequelize) => {
    const post = sequelize.define('post', {
        // Model attributes are defined here
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        views: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0

        }, created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        }, updated_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        }
    }, {
        timestamps: false
    });

    // `sequelize.define` also returns the model
    console.log(post === sequelize.models.post); // true


    await sequelize.sync();

    // adding default blog SettingValue
    const initPost = await post.create({
        author_id: 1,
        title: "initPost",
        slug: "initPost",
        content: "initPost",
        status: "2",
        thumbnail: "",
        created_at: "2022-08-03 14:36:19",
        updatedAt: "2022-08-03 14:36:19 blog"
    });
}