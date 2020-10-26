import app from './config/express'
import config from './config/config';
import db from './models/index';

const http = require('http').Server(app);
const io = require('socket.io')(http, {origins: '*:*'});

import {defineSocket} from './socket';

defineSocket(io);

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
http.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on port ${PORT}`);
});
