'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Levels',
      'levelName',
      {
        type: Sequelize.STRING,
        unique: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Levels',
      'levelName',
      {
        type: Sequelize.STRING,
        unique: false
      }
    );
  }
};
