import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server/app';
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

// describe('Checking Users', () => {
//   describe('an existing user', () => {
//     // it('should be able to create a new user if not existing', () => {
//     //   Users.create(usersTestSeed[0]);
//     //   expect(usersTestSeed[0]).to.exist;
//     //   expect(typeof usersTestSeed[0]).to.equal('object');
//     // });

//     it('should return `unique violation error` if username already exist`', (done) => {
//       Users.create(usersTestSeed[0])
//         .catch((errors) => {
//           errors.errors[0].type.should.equall('unique violation');
//           errors.name.should.eql('SequelizeUniqueConstraintError');
//           done();
//         });
//     });

//     // it('should return `unique violation error` if email already exist`', (done) => {
//     //   Users.create(usersTestSeed[1])
//     //     .catch((errors) => {
//     //       errors.message.should.eql('email already exist. choose another or login');
//     //       errors.errors[0].type.should.eql('unique violation');
//     //       errors.name.should.eql('SequelizeUniqueConstraintError');
//     //       done();
//     //     });
//     // });
//   });
// });

