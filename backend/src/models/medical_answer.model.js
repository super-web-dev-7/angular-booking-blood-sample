module.exports = (sequelize, Sequelize) => {
    return sequelize.define('medical_answer', {
        questionId: {
            type: Sequelize.INTEGER
        },
        answer: {
            type: Sequelize.STRING
        },
    });
};
