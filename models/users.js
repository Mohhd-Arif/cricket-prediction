'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    email: {
      type:DataTypes.STRING,
      trim:true,
      lowercase: true,
      allowNull: {
        arg:false,
        msg:"Please enter Email"
      },
      validate: {
        isEmail:{
          arg:true,
          msg:"Please enter valid Email"
        }
      },
      unique: {
        arg: true,
        msg: 'User already registered. Please Login'
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull: {
        arg:false,
        msg:"Please enter password"
      }
    },
    firstName: {
      type:DataTypes.STRING,
      trim:true,
      allowNull: {
        arg:false,
        msg:"Please enter first name"
      }
    },
    lastName: DataTypes.STRING,
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    address: DataTypes.TEXT,
    verified: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    otp:DataTypes.INTEGER,
    otpSentTime:DataTypes.BIGINT,
    loginToken: DataTypes.STRING,
    tokenExpires: DataTypes.INTEGER,
    lastLogin: DataTypes.INTEGER,
    usertype: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};