module.exports = (sequelize, Sequelize) => {
    return sequelize.define('patient_recall', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        callbackId: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.BIGINT
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        },
        patientNotThere: {
            type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false
        }
    });
};
