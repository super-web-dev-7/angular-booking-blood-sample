module.exports = (sequelize, Sequelize) => {
    return sequelize.define('additional-package', {
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
        package_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM('Inactive', 'Public', 'Intern')
        }
    });
};
