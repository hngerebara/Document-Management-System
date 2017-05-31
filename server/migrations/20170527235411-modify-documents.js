module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
    'Documents',
    'creatorId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'creatorId',
        },
      });
  },

  down(queryInterface) {
    queryInterface.removeColumn('Documents', 'ceatorId');
  }
};
