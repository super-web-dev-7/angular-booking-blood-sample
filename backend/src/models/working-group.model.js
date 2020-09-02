module.exports = (sequelize, Sequelize) => {
    return sequelize.define('working_group', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        admin: {
            type: Sequelize.STRING
        },
        calendar_id: {
            type: Sequelize.INTEGER
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
