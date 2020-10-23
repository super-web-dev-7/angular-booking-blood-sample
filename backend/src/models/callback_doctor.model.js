module.exports = (sequelize, Sequelize) => {
    return sequelize.define('callback_doctor', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.ENUM('morning', 'afternoon', 'evening')
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        schedule: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false
        }
    });
};
