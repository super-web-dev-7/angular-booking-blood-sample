module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM('Superadmin', 'AG-Admin', 'Doctor', 'Nurse', 'Patient')
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        allocation: {
            type: Sequelize.INTEGER
        },
        isActive: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
