module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointment_result', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        nurseId: {
            type: Sequelize.INTEGER
        },
        pressure: {
            type: Sequelize.STRING
        },
        pulse: {
            type: Sequelize.INTEGER
        },
        oxygen: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.INTEGER
        },
        weight: {
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
        }
    });
};
