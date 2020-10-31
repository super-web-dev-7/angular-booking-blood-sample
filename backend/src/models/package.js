module.exports = (sequelize, Sequelize) => {
    return sequelize.define('package', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        number: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        special_price: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM('Inactive', 'Public', 'Intern')
        },
        groupId: {
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.TEXT
        }
    });
};
