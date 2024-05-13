'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.message, {
        foreignKey: 'user_id'
      })
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
    paranoid: true
  });
  return user;
};