'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TTwentyMatchSessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sixOver: {
        type: Sequelize.INTEGER
      },
      tenOver: {
        type: Sequelize.INTEGER
      },
      fifteenOver: {
        type: Sequelize.INTEGER
      },
      twentyOver: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TTwentyMatchSessions');
  }
};