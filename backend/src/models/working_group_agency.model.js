module.exports = (sequelize, Sequelize) => {
    return sequelize.define('working_group_agency', {
        groupId: {
            type: Sequelize.INTEGER
        },
        agencyId: {
            type: Sequelize.INTEGER
        }
    });
};
