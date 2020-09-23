module.exports = (sequelize, Sequelize) => {
    return sequelize.define('working_group', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        admin: {
            type: Sequelize.STRING
        },
        calendar_id: {
            type: Sequelize.INTEGER
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
        agency_id: {
            type: Sequelize.INTEGER
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
