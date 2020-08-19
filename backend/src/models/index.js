import config from '../config/config';
import Sequelize from "sequelize";
import user from './user.model';
import calendar from './calendar.model';
import district from './district.model';
import paket from './package';
import template from './template.model';
import workingGroup from './working-group.model';

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: config.dialect,
    operatorsAliases: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.calendar = calendar(sequelize, Sequelize);
db.district = district(sequelize, Sequelize);
db.package = paket(sequelize, Sequelize);
db.template = template(sequelize, Sequelize);
db.workingGroup = workingGroup(sequelize, Sequelize);

export default db;
