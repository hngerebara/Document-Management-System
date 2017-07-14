import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import cfg from '../../../../server/configs/config';
import app from '../../../../server/app';
import { Users, sequelize, Roles } from '../../../../server/models';

const expect = chai.expect;

chai.use(chaiHttp);
describe('Search Users and Documents', () => {
  let token;
  const roles = [{ title: 'Admin' }, { title: 'Staff' }];
  const admin = {
    username: 'HopeazAdmin',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'HopeazAdmin@gmail.com',
    password: '12345',
    roleId: 1
  };
  const user = {
    username: 'user',
    firstName: 'Blessed',
    lastName: 'BlessedNg',
    email: 'blessed@gmail.com',
    password: '12345',
    roleId: 2
  };

  const document = {
    documentName: 'TestDocument1',
    description: 'Description of testdocument',
    content: 'hello content of test document'
  };

  before((done) => {
    sequelize.sync({ force: true }).done(() => {
      Roles.bulkCreate(roles)
      .then(() => {
        Users.create(admin)
        .then((adminUser) => {
          const payload = {
            id: adminUser.id,
            username: adminUser.username,
            roleId: adminUser.roleId
          };
          token = jwt.sign(payload, cfg.jwtSecret, {
            expiresIn: 60 * 60 * 24
          });
        });
        Users.create(user)
        .then((normalUser) => {
          const payload = {
            id: normalUser.id,
            username: normalUser.username,
            roleId: normalUser.roleId
          };
          token = jwt.sign(payload, cfg.jwtSecret, {
            expiresIn: 60 * 60 * 24
          });
        });
        done();
      });
    });
  });
 describe('Route: Users', () => {
  describe('/GET search for a user', () => {
    it('it should return unauthorized if not an admin ', (done) => {
      chai
      .request(app)
        .get('/api/search/users?search=testuser')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.eql('Unauthorized');
          done();
        });
    });

    it('it should retrieve all matching instances of the search query', (done) => {
      chai
      .request(app)
        .get('/api/search/users?search=user')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.null;
          expect(res.body.searchUsers[0]).to.have.property('firstName')
          .to.equal('Blessed');
          done();
        });
    });

    it('it should return the searched user ', (done) => {
      chai
      .request(app)
        .get('/api/search/users?search=bles')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.searchPagination.pageCount).to.equal(1);
          expect(res.body.searchPagination.rowsPerPage).to.equal(1);
          expect(res.body.searchPagination.totalCount).to.equal(1);
          expect(res.body.searchUsers).to.be.an('array').have.lengthOf(1);
          expect(res.body.searchUsers[0].username).to.equal('user');
          expect(res.body.searchUsers[0].roleId).to.equal(2);
          expect(res.body.searchUsers[0].firstName).to.equal('Blessed');
          expect(res.body.searchUsers[0].lastName).to.equal('BlessedNg');
          expect(res.body.searchUsers[0].email).to.equal('blessed@gmail.com');
          done();
        });
    });
  });
 });
  describe('Route: Documents', () => {
    it('it should return a document matching the search query', (done) => {
      chai
      .request(app)
        .get('/api/search/documents?search=Tes')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

  });
});
