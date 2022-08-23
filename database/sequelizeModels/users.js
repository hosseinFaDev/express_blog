module.exports = async (Sequelize, DataTypes, sequelize) => {
    const user = sequelize.define('user', {
        // Model attributes are defined here
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
        description	: {
            type: DataTypes.TEXT,
            allowNull: true

        },
        role: {
            type: DataTypes.TINYINT,
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
    console.log(user === sequelize.models.user); // true
    
    await sequelize.sync();
    
    // adding default blog SettingValue
    const root = await user.create({
        full_name: "ROOT",
        email: "root@root.com",
        password: "$2b$10$VCu3QQcGQlxM.8VP.x4JWuaiogz4OgU.DdgMXuODGCL55Pl0G8bam",
        description: "root user",
        role: 2,
    });
}