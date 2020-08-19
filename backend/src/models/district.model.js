module.exports = (sequelize, Sequelize) => {
    return sequelize.define('district', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        zipcode: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
