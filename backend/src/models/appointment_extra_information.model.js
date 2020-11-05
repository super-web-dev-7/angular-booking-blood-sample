module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointment_extra_information', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        additionalPackageId: {
            type: Sequelize.INTEGER
        },
        payment: {
            type: Sequelize.ENUM('alternative', 'customerStore')
        },
        message: {
            type: Sequelize.TEXT
        }
    });
};
