module.exports = (sequelize, Sequelize) => {
    return sequelize.define('zipcode_model',
        {
            ort: {
                type: Sequelize.STRING,
            },
            plz: {
                type: Sequelize.INTEGER
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
};
