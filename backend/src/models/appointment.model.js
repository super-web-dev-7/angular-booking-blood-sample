module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointment', {
        name: {
            type: Sequelize.STRING,
        },
        // agency_id: {
        //     type: Sequelize.INTEGER
        // },
        // package_id: {
        //     type: Sequelize.INTEGER
        // },
        // user_id: {
        //     type: Sequelize.INTEGER
        // },
        time: {
            type: Sequelize.BIGINT
        },
        ready: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        }
    });
};
