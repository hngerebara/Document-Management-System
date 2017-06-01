import bcrypt from 'bcrypt';

export default(sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: 'username must be at least 3 in length'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'firstname must be at least 3 characters in length'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'lastname must be at least 3 characters in length'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: 'Email address must be between 6 and 128 characters in length'
        },
        isEmail: {
          msg: 'Email address must be valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    roleTitle: {
      type: DataTypes.STRING,
      defaultValue: 'Staff',
      allowNull: false
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: (models) => {
        Users.belongsTo(models.Roles, {
          onDelete: 'CASCADE',
          foreignKey: 'roleTitle'
        });
        Users.belongsTo(models.Levels, {
          onDelete: 'CASCADE',
          foreignKey: 'levelId'
        });
        Users.hasMany(models.Documents, {
          onDelete: 'CASCADE',
          foreignKey: 'creatorId',
          as: 'allDocuments'
        });
      },
      IsPassword: (encodedPassword, password) =>
      bcrypt.compareSync(password, encodedPassword)
    }
  });
  return Users;
};
