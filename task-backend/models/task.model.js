const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Task = sequelize.define('Task', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  assignedBy: DataTypes.STRING,
  assignedTo: DataTypes.STRING,
  complexity: DataTypes.INTEGER,
  deadline: DataTypes.STRING,
  tokens: DataTypes.INTEGER,
  transactionHash: DataTypes.STRING,
});

module.exports = Task;
