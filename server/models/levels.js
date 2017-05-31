export default(sequelize, DataTypes) => {  
  const Levels = sequelize.define('Levels', {
    levelName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: 'title must be atleast 3 characters in length',
        },
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        Levels.hasMany(models.Users, {
          foreignKey: 'levelId',
          as: 'levels',
        });
      }
    }
  });
  return Levels;
};
