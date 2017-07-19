export default(sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    documentName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      msg: 'Document with this title already exist',
      validate: {
        len: {
          args: [3, 50],
          msg: 'Documents name must be between 3 and 50 characters in length'
        }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 200],
          msg: 'Documents description must be between 3 and 200 characters in length'
        }
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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
          onDelete: 'SET NULL',
          foreignKey: 'creatorId'
        });
      }
    }
  });
  return Documents;
};
