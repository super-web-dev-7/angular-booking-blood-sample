module.exports = (sequelize, Sequelize) => {
    return sequelize.define('package_group', {
        packageId: {
            type: Sequelize.INTEGER,
        },
        groupId: {
            type: Sequelize.INTEGER
        }
    });
};
