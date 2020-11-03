module.exports = (sequelize, Sequelize) => {
    return sequelize.define('contact_history', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.ENUM(
                'callback_created',
                'callback_answer',
                'appointment_created',
                'appointment_cancel',
                'appointment_confirmed',
                'appointment_archived',
                'medical_question_created',
                'medical_question_answer',
                'recall_created'
            )
        },
        otherId: {
            type: Sequelize.INTEGER
        }
    });
};
