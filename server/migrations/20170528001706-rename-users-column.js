module.exports = {
  up: (queryInterface) => {
    queryInterface.renameColumn(
    'Users',
    'roleId',
    'RoleId'
    );
  },

  down: (queryInterface) => {
    queryInterface.renameColumn('Users', 'RoleId',
    'roleId');
  }
};
