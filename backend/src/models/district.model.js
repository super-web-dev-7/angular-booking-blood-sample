module.exports = (sequelize, Sequelize) => {
    return sequelize.define('district', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        city: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
