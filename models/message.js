'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    static associate(models) {
      message.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
    }
  }
  message.init({
    message: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};