module.exports = (sequelize, Sequelize) => {
    return sequelize.define('calendar', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        district_id: {
            type: Sequelize.STRING
        },
        nurse: {
            type: Sequelize.INTEGER
        },
        duration_appointment: {
            type: Sequelize.INTEGER
        },
        rest_time: {
            type: Sequelize.INTEGER
        },
        working_time_from: {
            type: Sequelize.INTEGER
        },
        working_time_until: {
            type: Sequelize.INTEGER
        },
    });
};
