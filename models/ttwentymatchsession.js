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
    sixOver: DataTypes.INTEGER,
    tenOver: DataTypes.INTEGER,
    fifteenOver: DataTypes.INTEGER,
    twentyOver: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TTwentyMatchSession',
  });
  return TTwentyMatchSession;
};