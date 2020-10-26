module.exports = (sequelize, Sequelize) => {
    return sequelize.define('editing_status', {
        doctorId: {
            type: Sequelize.INTEGER
        },
        doctorFirstName: {
            type: Sequelize.STRING
        },
        doctorLastName: {
            type: Sequelize.STRING
        },
        appointmentId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.INTEGER
        },
        table: {
            type: Sequelize.INTEGER
        }
    });
};
