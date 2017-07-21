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

  describe('/POST Users', () => {
    it('should create a user with these fields', (done) => {
      chai.request(app).post('/api/users').send(user).end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(201);
        expect(response).to.be.a('object');
        expect(response.user).to.be.a('object');
        expect(response.token).to.be.a('string');
        expect(response.user.firstName).to.eql('Hope');
        expect(response.user.lastName).to.eql('Ngerebara');
        expect(response.user.email).to.eql('Hopeaz@gmail.com');
        expect(response.user.roleId).to.eql(2);
        done();
      });
    });
    it('should not create a user if the username or email is not unique', (done) => {
      chai.request(app).post('/api/users').send(user).end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.include('User email or password already exists');
        done();
      });
    });
  });

  describe('/GET Users', () => {
    it('should allow Admin succesfully retrieve all the Users', (done) => {
      chai
        .request(app)
        .get('/api/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          const { users, pagination } = res.body;
          expect(res.body).to.be.a('object');
          expect(pagination).to.be.a('object');
          expect(pagination).to.include.keys(
            'pageCount',
            'page',
            'rowsPerPage',
            'totalCount'
          );
          expect(pagination.pageCount).to.eql(1);
          expect(pagination.page).to.eql(1);
          expect(pagination.rowsPerPage).to.eql(2);
          expect(pagination.totalCount).to.eql(2);
          expect(users).to.have.length(2);
          expect(users[0]).to.have.property('username')
          .to.eql('HopeazAdmin');
          expect(users[0]).to.have.property('roleId')
          .to.eql(1);
          expect(users[1]).to.have.property('username')
          .to.eql('Hopeaz');
          expect(users[1]).to.have.property('roleId')
          .to.eql(2);
          done();
        });
    });

    it("it should return 'unauthorized' for incorect loggin details", (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send({
          email: 'Hopezaz@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message)
          .to.equal('Your details are incorrect..Try again');
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should allow admin to retrieve a single user', (done) => {
      chai
        .request(app)
        .get('/api/users/2')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          const response = res.body.user;
          expect(res).to.have.status(200);
          expect(response).to.be.a('object');
          expect(response.username).to.eql('Hopeaz');
          expect(response.roleId).to.eql(2);
          expect(response.id).to.eql(2);
          expect(response.email).to.eql('Hopeaz@gmail.com');
          done();
        });
    });

    it('should return an error for invalid user id', (done) => {
      chai
        .request(app)
        .get('/api/users/89876')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.eql(
            '{"message":"User with id 89876 does not exist"}'
          );
          done();
        });
    });
  });

  describe('PUT /users/id', () => {
    it("should not allow users to edit other user's profile", (done) => {
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
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal(
            'You have no rights to update this profile'
          );
          done();
        });
    });
    it('should allow users update their profile', (done) => {
      chai
        .request(app)
        .put('/api/users/1')
        .set('Authorization', `JWT ${token}`)
        .send({
          firstName: 'Hope',
          lastName: 'Ngerebara',
          email: 'Hopeazmodified@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          const response = res.body.user;
          expect(res).to.have.status(202);
          expect(response.id).to.eql(1);
          expect(response.roleId).to.eql(1);
          expect(response.email).to.equal('Hopeazmodified@gmail.com');
          expect(response.lastName).to.equal('Ngerebara');
          expect(response.firstName).to.equal('Hope');
          done();
        });
    });
  });

  describe('DELETE users/:id', () => {
    it('should allow admin to delete any user profile', (done) => {
      chai
        .request(app)
        .delete('/api/users/2')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.eql('User deleted successfully.');
          done();
        });
    });

    it('should check username does not exist', (done) => {
      chai.request(app)
      .get('/api/check-username/:username')
      .send({
        username: 'HopeazBlessed'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('successful');
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
          expect(res.status).to.eql(200);
          expect(res.body).to.have.property('message')
          .to.equal('You have succesfully logged out');
          done();
        });
    });
  });
});
