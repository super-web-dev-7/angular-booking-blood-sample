module.exports = (sequelize, Sequelize) => {
    return sequelize.define('district_model', {
        name: {
            type: Sequelize.STRING,
        },
        zipcode: {
            type: Sequelize.STRING
        }
    });
};
