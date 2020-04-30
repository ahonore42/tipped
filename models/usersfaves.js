'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersFaves = sequelize.define('usersFaves', {
    userId: DataTypes.INTEGER,
    faveId: DataTypes.INTEGER
  }, {});
  usersFaves.associate = function(models) {
    // associations can be defined here
  };
  return usersFaves;
};