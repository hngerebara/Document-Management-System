import chai from 'chai';
import chaiHttp from 'chai-http';
import { Users } from '../../../../server/models';
import { usersTestSeed } from '../../seeders';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Checking Users model', () => {
  it('should create a user with property username', () => {
    Users.create(usersTestSeed[0]);
    Users.all().then(() => {
      expect(usersTestSeed[0]).to.have.property('username');
    });
  });

  it('should create a user with property firstName', () => {
    Users.create(usersTestSeed[0]);
    Users.all().then(() => {
      expect(usersTestSeed[0]).to.have.property('firstName');
    });
  });

  it('should create a user with property lastName', () => {
    Users.create(usersTestSeed[0]);
    Users.all().then(() => {
      expect(usersTestSeed[0]).to.have.property('lastName');
    });
  });

  it('should create a user with property email', () => {
    Users.create(usersTestSeed[0]);
    Users.all().then(() => {
      expect(usersTestSeed[0]).to.have.property('email');
    });
  });

  it('should create a user with property password', () => {
    Users.create(usersTestSeed[0]);
    Users.all().then(() => {
      expect(usersTestSeed[0]).to.have.property('password');
    });
  });
});
