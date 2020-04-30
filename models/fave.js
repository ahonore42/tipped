'use strict';
module.exports = (sequelize, DataTypes) => {
  const fave = sequelize.define('fave', {
    name: DataTypes.STRING,
    drinkId: DataTypes.STRING
  }, {});
  fave.associate = function(models) {
    // associations can be defined here
    models.fave.belongsToMany(models.user, {
      through: 'usersFaves',
      onDelete: 'CASCADE'
    })
  };
  return fave;
};