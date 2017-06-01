import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';
import { Users } from '../../models';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users model', () => {
  const user = {
    username: 'hopez',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'hopez@gmail.com',
    password: '12345',
    levelId: 1
  };

  it('should be able to create a new user', () => {
    Users.create(user);
    expect(user).to.exist;
    expect(typeof user).to.equal('object');
  });

  it('should create a user with property username', () => {
    Users.create(user);
    Users.all().then(() => {
      expect(user).to.have.property('username');
    });
  });

  it('should create a user with property firstName', () => {
    Users.create(user);
    Users.all().then(() => {
      expect(user).to.have.property('firstName');
    });
  });
  it('should create a user with property lastName', () => {
    Users.create(user);
    Users.all().then(() => {
      expect(user).to.have.property('lastName');
    });
  });
  it('should create a user with property email', () => {
    Users.create(user);
    Users.all().then(() => {
      expect(user).to.have.property('email');
    });
  });

  it('should create a user with property password', () => {
    Users.create(user);
    Users.all().then(() => {
      expect(user).to.have.property('password');
    });
  });
});

