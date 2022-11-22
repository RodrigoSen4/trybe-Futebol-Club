const { DataTypes } = require('sequelize');

'use strict';

module.exports = {
  up: async (queryInterface) => {
     await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      team_name: {
        type: DataTypes.STRING,
      },
    }
    );
  },
  down: async (queryInterface) => {
     await queryInterface.dropTable('teams');
  }
};