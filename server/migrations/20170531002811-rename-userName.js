module.exports = {
  up: (queryInterface) => {
    queryInterface.renameColumn(
    'Users',
    'userName',
    'username'
    );
  },

  down: (queryInterface) => {
    queryInterface.renameColumn('Users', 'username',
    'userName');
  }
};
