module.exports = (sequelize, Sequelize) => {
    return sequelize.define('contact_history', {
        appointmentId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        }
    });
};
