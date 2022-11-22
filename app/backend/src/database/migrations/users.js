const { DataTypes } = require('sequelize');

'use strict';

module.exports = {
  up: async (queryInterface) => {
     await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    }
    );

  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('users');
  }
};
