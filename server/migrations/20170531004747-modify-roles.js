'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Roles',
      'title',
      {
        type: Sequelize.STRING,
        unique: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Roles',
      'title',
      {
        type: Sequelize.STRING,
        unique: false
      }
    );
  }
};
