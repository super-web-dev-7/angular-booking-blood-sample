module.exports = (sequelize, Sequelize) => {
    return sequelize.define('template_action', {
        name: {
            type: Sequelize.STRING
        },
        sms: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        email: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        patient: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        doctor: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        nurse: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },

    });
};
