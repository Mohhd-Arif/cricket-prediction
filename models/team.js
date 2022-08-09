'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    name: {
      type:DataTypes.STRING,
      trim:true,
      lowercase: true,
      allowNull: {
        arg:false,
        msg:"Please enter team name"
      },
      unique: {
        arg: true,
        msg: 'Team Already Exist!!!!.'
      },
    },
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};