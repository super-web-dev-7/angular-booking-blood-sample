module.exports = (sequelize, Sequelize) => {
    return sequelize.define('agency_group', {
        agencyId: {
            type: Sequelize.INTEGER
        },
        groupId: {
            type: Sequelize.INTEGER
        }
    });
};
