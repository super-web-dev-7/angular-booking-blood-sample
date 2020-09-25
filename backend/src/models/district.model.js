module.exports = (sequelize, Sequelize) => {
    return sequelize.define('district', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        model: {
            type: Sequelize.INTEGER
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
