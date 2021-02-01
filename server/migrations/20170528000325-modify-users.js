module.exports = {
  up: (queryInterface, Sequelize) => {
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
      });
  },

  down(queryInterface) {
    queryInterface.removeColumn('Users', 'RoleId');
  }
};
