module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
    'Users',
    'levelId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Levels',
          key: 'id',
          as: 'levelId',
        },
      });
  },

  down(queryInterface) {
    queryInterface.removeColumn('Users', 'levelId');
  }
};
