import app from './config/express'
import config from './config/config';
import db from './models/index';

if (!config.port) {
    process.exit(1)
}

const PORT = parseInt(config.port, 10) || 7000;

/**
 * Initialize MySQL
 */

db.sequelize.sync();

/**
 * Server Activation
 */

const server = app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on port ${PORT}`);
});
