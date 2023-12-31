const { config } = require('./../../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}?sslmode=require`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl:{
        rejectUnauthorized:false
      }
    }
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}
