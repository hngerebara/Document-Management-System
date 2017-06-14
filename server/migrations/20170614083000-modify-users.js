module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'levelId');
  },

  down(queryInterface) {
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
  }
};
