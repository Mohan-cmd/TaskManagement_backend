const { Sequelize } = require('sequelize');

// 📝 Update these values as per your PostgreSQL setup
const sequelize = new Sequelize('taskdb', 'postgress', 'postgress', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
