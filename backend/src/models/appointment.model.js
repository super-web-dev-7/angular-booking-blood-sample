module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointment', {
        name: {
            type: Sequelize.STRING,
        },
        time: {
            type: Sequelize.BIGINT
        },
        ready: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        adminStatus: {
            type: Sequelize.ENUM('upcoming', 'confirmed', 'canceled', 'successful'), defaultValue: 'upcoming'
        },
        medical_report: {
            type: Sequelize.ENUM('open', 'closed'), defaultValue: 'open'
        }
    });
};
