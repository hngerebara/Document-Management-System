export default(sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: "title must be atleast 3 characters in length"
        }
      }   
    },
  }, {
    classMethods: {
      associate: function(models) {
        Roles.hasMany(models.Users, {
          foreignKey: 'RoleId',
          as: 'allUsers',
        })
      }
    }
  });
  return Roles;
};