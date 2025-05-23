const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taskdb', 'postgress', 'postgress', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
