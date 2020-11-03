module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointment', {
        name: {
            type: Sequelize.STRING,
        },
        time: {
            type: Sequelize.BIGINT
        },
        nurseStatus: {
            type: Sequelize.ENUM('initial', 'standard', 'ready', 'taken'), defaultValue: 'initial'
        },
        adminStatus: {
            type: Sequelize.ENUM('upcoming', 'confirmed', 'canceled', 'successful'), defaultValue: 'upcoming'
        },
        anamnesisStatus: {
            type: Sequelize.ENUM('open', 'closed'), defaultValue: 'closed'
        },
        callbackStatus: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        archive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
