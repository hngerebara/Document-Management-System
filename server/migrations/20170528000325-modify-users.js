'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
    'Users',
    'roleId',
    {
      type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'Roles',
            key: 'id',
            as: 'RoleId',
          },
    })
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Users', 'RoleId')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
