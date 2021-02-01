module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'RoleId');
    queryInterface.addColumn(
    'Users',
    'title',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key: 'title',
          as: 'title',
        },
      });
  },

  down: (queryInterface) => {
    queryInterface.addColumn(
    'Users',
    'RoleId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key: 'id',
          as: 'RoleId',
        },
      });
    queryInterface.removeColumn('Users', 'title');
  }
};
