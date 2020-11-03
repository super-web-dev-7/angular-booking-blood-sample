module.exports = (sequelize, Sequelize) => {
    return sequelize.define('callback_answer', {
        callbackId: {
            type: Sequelize.INTEGER
        },
        answer: {
            type: Sequelize.STRING
        },
    });
};
