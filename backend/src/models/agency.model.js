module.exports = (sequelize, Sequelize) => {
    return sequelize.define('agency', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        group_id: {
            type: Sequelize.INTEGER
        },
        doctors_id: {
            type: Sequelize.STRING
        },
    });
};
