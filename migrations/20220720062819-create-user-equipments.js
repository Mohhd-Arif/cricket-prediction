'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserEquipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      pathMode: {
        type: Sequelize.STRING
      },
      sourceLat: {
        type: Sequelize.STRING
      },
      sourceLong: {
        type: Sequelize.STRING
      },
      destinationLat: {
        type: Sequelize.STRING
      },
      destinationLong: {
        type: Sequelize.STRING
      },
      speed: {
        type: Sequelize.INTEGER
      },
      journeyStart: {
        type: Sequelize.BOOLEAN
      },
      journeyEnd: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('UserEquipments');
  }
};