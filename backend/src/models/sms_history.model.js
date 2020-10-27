module.exports = (sequelize, Sequelize) => {
    return sequelize.define('sms_history', {
        subject: {
            type: Sequelize.STRING
        },
        receiver: {
            type: Sequelize.INTEGER
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        content: {
            type: Sequelize.TEXT
        }
    });
};
