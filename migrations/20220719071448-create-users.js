'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loginName: {
        type: Sequelize.STRING
      },
      loginPwd: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      adminLevel: {
        type: Sequelize.INTEGER
      },
      pwdNeedsReset: {
        type: Sequelize.BOOLEAN
      },
      loginToken: {
        type: Sequelize.STRING
      },
      tokenExpires: {
        type: Sequelize.INTEGER
      },
      lastLogin: {
        type: Sequelize.INTEGER
      },
      usertype: {
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
    await queryInterface.dropTable('Users');
  }
};