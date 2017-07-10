import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import cfg from '../../../../server/configs/config';
import app from '../../../../server/app';
import { Users, sequelize, Roles } from '../../../../server/models';

const expect = chai.expect;

chai.use(chaiHttp);
describe('Route: Users', () => {
  let token;
  const roles = [{ title: 'Admin' }, { title: 'Staff' }];
  const user = {
    id: 1,
    username: 'Hopeaz',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'Hopeaz@gmail.com',
    password: '12345'
  };

  const admin = {
    username: 'HopeazAdmin',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'HopeazAdmin@gmail.com',
    password: '12345',
    roleId: 1
  };

  before((done) => {
    sequelize.sync({ force: true }).done(() => {
      Roles.bulkCreate(roles).then(() => {
        Users.create(admin).then((adminUser) => {
          const payload = {
            id: adminUser.id,
            username: adminUser.username,
            title: adminUser.roleTitle
          };
          token = jwt.sign(payload, cfg.jwtSecret, {
            expiresIn: 60 * 60 * 24
          });
          done();
        });
      });
    });
  });

  after(() => Users.destroy({ where: {} }));

  describe('Users', () => {
    describe('/POST Users', () => {
      it('it should create a user with these fields', (done) => {
        chai.request(app).post('/api/users').send(user).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.text).to.include('"message":"User signed up succesfully"');
          done();
        });
      });
    });
    describe('User validation', () => {
      it('it should not create a user if the username or email is not unique', (done) => {
        chai.request(app).post('/api/users').send(user).end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });

      it('it should not allow fields to be null', (done) => {
        chai
          .request(app)
          .post('/api/users/')
          .send({
            username: 'hellodd',
            email: 'hellddo@gmail.com',
            password: '12345'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors.message).to.include(
              'firstName cannot be null'
            );
            expect(res.body.errors.message).to.include(
              'lastName cannot be null'
            );
            done();
          });
      });

      it('should reject firstnames less than 3 characters', (done) => {
        chai
          .request(app)
          .post('/api/users/')
          .send({
            username: 'Wrong1',
            email: 'hellhado@gmail.com',
            password: '12345',
            firstName: 'F',
            lastName: 'Great'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors.message).to.include(
              'firstname must be at least 3 characters in length'
            );
            done();
          });
      });
    });
  });

  describe('/GET Users', () => {
    it('it should succesfully GET all the Users', (done) => {
      chai
        .request(app)
        .get('/api/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.message).to.equal('users successfully retrieved');
          expect(res.body.pagination).to.be.a('object');
          expect(res.body.pagination).to.include.keys(
            'pageCount',
            'page',
            'rowsPerPage',
            'totalCount'
          );
          expect(res.body.users[0]).to.have.property('username');
          expect(res.body.users[0]).to.have.property('firstName');
          expect(res.body.users[0]).to.have.property('lastName');
          expect(res.body.users[0]).to.have.property('email');
          expect(res.body.users[0].lastName).to.equal('Ngerebara');
          expect(res.body.users[0]).to.include.keys(
            'id',
            'username',
            'firstName',
            'lastName',
            'email',
            'roleId'
          );
          done();
        });
    });

    it("it should return 'unauthorized' if login details are incorrect", (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send({
          email: 'Hopezaz@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should allow admin to view user profile', (done) => {
      chai
        .request(app)
        .get('/api/users/')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users[1].username).to.equal('Hopeaz');
          expect(res.body.users[1].roleId).to.equal(2);
          expect(res.body.users[1].email).to.equal('Hopeaz@gmail.com');
          expect(res.body.users[1]).to.be.a('object');
          done();
        });
    });

    it('invalid user profile should return an error', (done) => {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'Hopeaz@gmail.com',
          password: '12345'
        })
        .end(() => {
          chai
            .request(app)
            .get('/api/users/89876')
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
              expect(res).to.have.status(404);
              expect(res.text).to.equal(
                '{"message":"User with id 89876 does not exist"}'
              );
              done();
            });
        });
    });
  });

  describe('PUT /users/id', () => {
    it("should allow all users to edit other user's profile", (done) => {
      chai
        .request(app)
        .put('/api/users/2')
        .set('Authorization', `JWT ${token}`)
        .send({
          username: 'Hopeazmodified',
          firstName: 'Hope',
          lastName: 'Ngerebara',
          email: 'Hopeazmodified@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.text).to.equal(
            '{"message":"You have no rights to update this profile"}'
          );
          done();
        });
    });
    it('should allow update their profile', (done) => {
      chai
        .request(app)
        .put('/api/users/1')
        .set('Authorization', `JWT ${token}`)
        .send({
          username: 'Hopeazmodified',
          firstName: 'Hope',
          lastName: 'Ngerebara',
          email: 'Hopeazmodified@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user.email).to.equal('Hopeazmodified@gmail.com');
          done();
        });
    });
  });

  describe('DELETE users/:id', () => {
    it('should alow admin to delete any user profile', (done) => {
      chai
        .request(app)
        .delete('/api/users/2')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('{"message":"User deleted successfully."}');
          done();
        });
    });

    it('it should checkusername does not exist', (done) => {
      chai.request(app)
      .get('/api/check-username/:username')
      .send({
        username: 'HopeazBlessed'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('successful');
        done();
      });
    });
  });

  describe('/POST logout a user', () => {
    it('it should logout a user', (done) => {
      chai
      .request(app)
        .post('/api/users/logout')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message')
          .to.equal('You have succesfully logged out');
          done();
        });
    });
  });
});
