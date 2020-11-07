module.exports = (sequelize, Sequelize) => {
    return sequelize.define('medical_question_reminder', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.ENUM('2h', '4h')
        },
    });
};
