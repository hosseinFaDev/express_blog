module.exports = async (Sequelize, DataTypes, sequelize) => {
    const comment = sequelize.define('comment', {
        // Model attributes are defined here
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: true

        },
        user_email: {
            type: DataTypes.STRING(100),
            allowNull: true

        },
        user_url: {
            type: DataTypes.STRING(100),
            allowNull: true

        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,

        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        parent: {
            type: DataTypes.INTEGER,
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
    console.log(comment === sequelize.models.comment); // true


  
}