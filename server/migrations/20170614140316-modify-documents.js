module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Documents', 'authorized');
  },

  down(queryInterface) {
    queryInterface.addColumn(
    'Documents',
    'authorized');
  }
};

