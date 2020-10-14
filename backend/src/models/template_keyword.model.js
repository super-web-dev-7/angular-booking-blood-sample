module.exports = (sequelize, Sequelize) => {
    return sequelize.define('template_keyword', {
        keyword: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.STRING
        }
    });
};
