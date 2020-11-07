module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointment_cancel_reason', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.ENUM('doctor_not_approve' ,'patient_cancel', 'nurse_not_there', 'nurse_shift')
        },
        message: {
            type: Sequelize.TEXT
        }
    });
};
