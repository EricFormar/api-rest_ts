import { Dialect, Sequelize } from 'sequelize';
import env from '../env';

const {db : {name,username,password,host, dialect, port}} = env;

let sequelizeConnection: Sequelize = new Sequelize(name, username, password, {
  host,
  dialect: dialect as Dialect,
  port : +port, 
});

export default sequelizeConnection;