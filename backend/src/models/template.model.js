module.exports = (sequelize, Sequelize) => {
    return sequelize.define('template', {
        subject: {
            type: Sequelize.STRING,
            unique: true
        },
        type: {
            type: Sequelize.ENUM('SMS', 'E-Mail')
        },
        receiver: {
            type: Sequelize.INTEGER
        },
        assign: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        }
    });
};
