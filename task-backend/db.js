const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taskdb', 'postgres', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
