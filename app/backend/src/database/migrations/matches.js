const { DataTypes } = require('sequelize');

'use strict';

module.exports = {
  up: async (queryInterface) => {
     await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      home_team: {
        type: DataTypes.INTEGER,
      },
      home_team_goals: {
        type: DataTypes.INTEGER,
      },
      away_team: {
        type: DataTypes.INTEGER,
      },
      away_team_goals: {
        type: DataTypes.INTEGER,
      },
      in_progress: {
        type: DataTypes.BOOLEAN,
      },
    }
    );

  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('matches');
  }
};