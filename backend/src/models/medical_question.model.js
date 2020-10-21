module.exports = (sequelize, Sequelize) => {
    return sequelize.define('medical_question', {
        name: {
            type: Sequelize.STRING,
        },
        appointmentId: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.INTEGER
        },
        weight: {
            type: Sequelize.INTEGER
        },
        smoking: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        alcohol: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        additionalInfo: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        heartAttack: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        previousIllness: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        takeMedication: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        disease: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
        }
    });
};
