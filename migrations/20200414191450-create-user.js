'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      username: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pic: {
        type: Sequelize.STRING,
        defaultValue: '/images/bartender-logo.png'
      },
      cover: {
        type: Sequelize.STRING,
        defaultValue: '/images/classyred.jpg'
      },
      city: {
        type: Sequelize.STRING
      },
      bar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};