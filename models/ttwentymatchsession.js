'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TTwentyMatchSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TTwentyMatchSession.init({
    teamId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    sixOver: {
      type:DataTypes.INTEGER,
      allowNull:false,
      default:0
    },
    tenOver: {
      type:DataTypes.INTEGER,
      allowNull:false,
      default:0
    },
    fifteenOver: {
      type:DataTypes.INTEGER,
      allowNull:false,
      default:0
    },
    twentyOver: {
      type:DataTypes.INTEGER,
      allowNull:false,
      default:0
    }
  }, {
    sequelize,
    modelName: 'TTwentyMatchSession',
  });
  return TTwentyMatchSession;
};