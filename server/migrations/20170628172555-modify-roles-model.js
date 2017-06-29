module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'roleTitle');
    queryInterface.addColumn(
    'Users',
    'roleId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleId',
        },
      });
  },

  down: (queryInterface) => {
    queryInterface.addColumn(
    'Users',
    'roleTitle',
      {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Roles',
          key: 'title',
          as: 'title',
        },
      });
    queryInterface.removeColumn('Users', 'roleId');
  }
};
