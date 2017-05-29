'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.renameColumn(
    'Users',
    'roleId',
    'RoleId'
    )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.renameColumn('Users','RoleId',
    'roleId')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
