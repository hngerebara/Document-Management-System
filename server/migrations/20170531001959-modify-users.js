'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'userName',
      {
        type: Sequelize.STRING,
        unique: true
      }
    );

    queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        unique: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'userName',
      {
        type: Sequelize.STRING,
        unique: false
      }
    );

    queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        unique: false
      }
    );
  }
};
