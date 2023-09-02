const { Sequelize } = require('sequelize');

const { config } = require('./../../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

let URL = URI;
if(config.env==='production'){
  URL=+"?sslmode=require";
}

const sequelize = new Sequelize(URL, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

module.exports = sequelize;
