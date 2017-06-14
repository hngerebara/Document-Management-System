export default(sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    documentName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Documents name or title must be at least 3 characters in length'
        }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Documents description must be at least 3 characters in length'
        }
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Doument content must be at least 3 characters in length'
        },
      }
    },
    access: {
      defaultValue: 'private',
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['private', 'public', 'role']],
          msg: 'access can only be public, private or role'
        }
      },
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          onDelete: 'CASCADE',
          foreignKey: 'creatorId'
        });
      }
    }
  });
  return Documents;
};
