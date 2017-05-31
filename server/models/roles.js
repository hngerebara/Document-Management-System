export default(sequelize, DataTypes) => {  
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: {
          args: [['Admin', 'Staff']],
          msg: 'access can only be an Admin or a staff'
        }
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Roles.hasMany(models.Users, {
          foreignKey: 'RoleId',
          as: 'allUsers',
        });
      }
    }
  });
  return Roles;
};
