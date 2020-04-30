'use strict';
let bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Oh, you don\'t have a first name?'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please give a valid email address 🤥'
        }
      }

    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Password must be longer than 6 characters'
        }
      }

    },
    bio: DataTypes.TEXT,
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING,
    cover: DataTypes.STRING,
    city: DataTypes.STRING,
    bar: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: pendingUser => {
        // Hash the password 
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
        // Reassign the hashed password (overwrite the plain text password)
        pendingUser.password = hashedPassword
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsToMany(models.fave, {
      through: 'usersFaves',
      onDelete: 'CASCADE'
    })
  };

user.prototype.validPassword = function(typedInPassword) {
    // Determine if the passwerd typed in hashes to the same thing as the existing link
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)

    // Return the boolean result of the comparison
    return correctPassword
}

  return user;
};