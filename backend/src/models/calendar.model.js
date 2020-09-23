module.exports = (sequelize, Sequelize) => {
    return sequelize.define('calendar', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        district_id: {
            type: Sequelize.STRING
        }
    });
};
