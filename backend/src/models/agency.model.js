module.exports = (sequelize, Sequelize) => {
    return sequelize.define('agency', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        doctors_id: {
            type: Sequelize.STRING
        },
    });
};
