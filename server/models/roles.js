export default(sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'Staff',
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
          foreignKey: 'roleId',
          as: 'allUsers',
        });
      }
    }
  });
  return Roles;
};
