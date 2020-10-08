module.exports = (sequelize, Sequelize) => {
    return sequelize.define('district_model', {
        city: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING,
        },
        zipcode: {
            type: Sequelize.INTEGER
        }
    });
};
