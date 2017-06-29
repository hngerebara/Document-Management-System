import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import cfg from '../../../configs/config';
import app from '../../../config/app';
import { Users, sequelize, Roles } from '../../../models';
// import db from '../../../models';

const expect = chai.expect;

chai.use(chaiHttp);
// Create update and delete works but I need to clear the db first.
describe('Route: Users', () => {
  let token;
  let userId;
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

  describe('/POST Users', () => {
    it('it should POST /Create a user with these fields', (done) => {
      chai.request(app).post('/api/users').send(user).end((err, res) => {
        // console.log(res.body.id);
        expect(res).to.have.status(201);
        expect(res.text).to.include('"message":"User signed up succesfully"');
        done();
      });
    });
    it('it should not POST if the username or email is not unique', (done) => {
      chai.request(app).post('/api/users').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });

    it('it should resturn SequelizeValidationError if information is incomplete', (done) => {
      chai
        .request(app)
        .post('/api/users/')
        .send({
          username: 'hello',
          email: 'hello@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.name).to.equal('SequelizeValidationError');
          done();
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
          console.log(res.body[0].id);
          expect(res.body[0]).to.have.property('username');
          expect(res.body[0]).to.have.property('firstName');
          expect(res.body[0]).to.have.property('lastName');
          expect(res.body[0]).to.have.property('email');
          expect(res.body[0]).to.have.property('password');
          expect(res.body[0].lastName).to.equal('Ngerebara');
          expect(res.body[0]).to.include.keys(
            'id',
            'username',
            'firstName',
            'lastName',
            'email',
            'password',
            'createdAt',
            'roleId',
            'updatedAt'
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
          expect(res.text).to.equal(
            '{"message":"email or password did not match"}'
          );
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
          expect(res.body[1].username).to.equal('Hopeaz');
          expect(res.body[1].roleId).to.equal(2);
          expect(res.body[1].email).to.equal('Hopeaz@gmail.com');
          expect(res.body[1]).to.be.a('object');
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
        .end((err, res) => {
          chai
            .request(app)
            .get('/api/users/89876')
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
              expect(res).to.have.status(404);
              expect(res.text).to.equal(
                '{"message":"User with 89876 does not exist"}'
              );
              done();
            });
        });
    });
  });

  describe('PUT /users/id', () => {
    it('should allow all users to edit their profile', (done) => {
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
          expect(res).to.have.status(200);
          expect(res.body.email).to.equal('Hopeazmodified@gmail.com');
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
  });
});
