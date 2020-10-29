module.exports = (sequelize, Sequelize) => {
    return sequelize.define('verification_code',
        {
            email: {
                type: Sequelize.STRING,
            },
            code: {
                type: Sequelize.STRING
            },
            isActive: {
                type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false
            }
        });
};
