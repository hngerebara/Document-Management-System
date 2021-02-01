module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
    'Users',
    'roleTitle',
      {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key: 'title',
          as: 'roleTitle',
        },
      });
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'roleTitle');
  }
};
