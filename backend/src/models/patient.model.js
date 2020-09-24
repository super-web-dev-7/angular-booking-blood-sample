module.exports = (sequelize, Sequelize) => {
    return sequelize.define('patient', {
        user_id: {
            type: Sequelize.INTEGER
        },
        salutation: {
            type: Sequelize.ENUM('Herr', 'Frau')
        },
        street: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female', 'Divers')
        },
        plz: {
            type: Sequelize.STRING
        },
        ort: {
            type: Sequelize.STRING
        },
        differentPlace: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        alternative: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        customerStore: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        sendSMS: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
