import { Logger } from 'logger';
import bcrypt from 'bcrypt-nodejs';
import faker from 'faker';
import { sequelize, Roles, Users, Documents } from '../../models';
/**
 * Seeder - Class to populate database with values for testing purpose
 */
class Seeder {

  /**
   * Seeding database with test values
   * @return {void}
   */
  static seed() {
    sequelize.sync({ force: true })
    .then(() => {
      Seeder.seedRoles()
      .then(() => {
        Seeder.seedUsers()
         .then(() => {
           Seeder.seedDocuments();
         });
      });
    })
    .catch((err) => {
      Logger.error(err);
    });
  }

  /**
   * seedRoles - Seed the roles table with some data for testing purpose
   * @return {Object} An instance of sequelize
   */
  static seedRoles() {
    const roles = [
      {
        title: 'Admin',
        read: true,
        write: true,
        delete: true,
      },
      {
        title: 'Staff',
        read: false,
        write: false,
        delete: false,
      }
    ];
    return Roles.bulkCreate(roles);
  }

  /**
   * Seed database with some default users
   * @returns {object} - A Promise object
   */
  static seedUsers() {
    const users = [
      {
        username: 'hopez1',
        email: 'hopez1'@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(7)),
        fullNames: 'Hope Ngerebara',
        RoleId: 1
      },
      {
        username: 'christopher',
        email: 'christopher@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(7)),
        fullNames: 'Christopher Ken',
        RoleId: 2
      },
      {
        username: 'Imam',
        email: 'Imam@gmail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(7)),
        fullNames: 'Imam Blessing',
        RoleId: 3
      }
    ];
    return Users.bulkCreate(users);
  }

  /**
   * Add some documents to database
   * @returns {object} - A Promise object
   */
  static seedDocuments() {
    const documents = [
      {
        title: 'Admin test case',
        content: faker.lorem.paragraph(),
        permission: 'private',
        creatorId: '1'
      },
      {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        permission: 'public',
        creatorId: '1'
      },
      {
        title: 'random document',
        content: faker.lorem.words(),
        permission: 'public',
        creatorId: '3'
      },
      {
        title: 'Spiderman',
        content: faker.lorem.words(),
        permission: 'private',
        creatorId: '3'
      },
      {
        title: 'The wake of humanism',
        content: faker.lorem.words(),
        permission: 'private',
        creatorId: '3'
      }
    ];
    return Documents.bulkCreate(documents);
  }


}

export default Seeder.seed();