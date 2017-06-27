import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../config/app';
import Users from '../models/users';

const expect = chai.expect;

chai.use(chaiHttp);
// Create update and delete works but I need to clear the db first.
describe('Route: Users', () => {
  //   beforeEach((done) => {
  //     Users.sync({ force: true })
  //      .then(() => {
  //        console.log('getting called');
  //        done();
  //      });
  //   });

  const user = {
    username: 'Hopeaz',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'Hopeaz@gmail.com',
    password: '12345'
  };
  describe('/POST Users', () => {
    it('it should POST /Create a user with these fields', (done) => {
      chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
              expect(res).to.have.status(201);
              expect(res.text).to.include('"message":"User signed up succesfully"');
              done();
            });
    });
    it('it should not POST if the username or email is not unique', (done) => {
      chai.request(app).post('/users').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });

    it('it should resturn SequelizeValidationError if information is incomplete', (done) => {
      chai
        .request(app)
        .post('/users/')
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
        .post('/users/login')
        .send({
          email: 'Hopeaz@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('"message":"Successfully signed in"');
          chai
            .request(app)
            .get('/users')
            .set('Authorization', `JWT ${res.body.token}`)
            .end((err, res) => {
              expect(res.body).to.be.a('array');
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
                'roleTitle',
                'updatedAt'
              );
              done();
            });
        });
    });

    it("it should return 'unauthorized' if login details are incorrect", (done) => {
      chai
        .request(app)
        .post('/users/login')
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
        .post('/users/login')
        .send({
          email: 'Hopeaz@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          chai
            .request(app)
            .get('/users/19')
            .set('Authorization', `JWT ${res.body.token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.username).to.equal('chriisksst');
              expect(res.body.roleTitle).to.equal('Staff');
              expect(res.body.email).to.equal('chrriksstt@gmail.com');
              expect(res.body).to.be.a('object');
              done();
            });
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
            .get('/users/89876')
            .set('Authorization', `JWT ${res.body.token}`)
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
  
//   describe('PUT /users/id', () => {
    //     it('should allow all users to edit their profile', (done) => {
    //      chai.request(app)
    //         .post('/users/login')
    //         .send({
    //           email: 'Hopeaz@gmail.com',
    //           password: '12345'
    //         })
    //         .end((err, res) => {
    //            chai.request(app)
    //         .put('/users/46')
    //         .set('Authorization', `JWT ${res.body.token}`)
    //         .send({
    //           username: 'Hopeazmodified',
    //             firstName: 'Hope',
    //             lastName: 'Ngerebara',
    //             email: 'Hopeazmodified@gmail.com',
    //             password: '12345'
    //         })
    //         .end((err, res) => {
    //           expect(res).to.have.status(200);
    //           expect(res.body.firstName).to.equal(Hopeazmodified);
    //           expect(res.body.user.email).to.equal(Hopeazmodified@gmail.com;
    //           done();
    //         });
    //     });
    //     });
//   });

//   describe('DELETE users/:id', () => {
//     it('should alow admin to delete any user profile', (done) => {
//       chai
//         .request(app)
//         .post('/users/login')
//         .send({
//           email: 'Hopeaz@gmail.com',
//           password: '12345'
//         })
//         .end((err, res) => {
//           chai
//             .request(app)
//             .delete('/users/46')
//             .set('Authorization', `JWT ${res.body.token}`)
//             .end((err, res) => {
//               expect(res).to.have.status(200);
//               expect(res.text).to.equal(
//                 '{"message":"User deleted successfully."}'
//               );
//               done();
//             });
//         });
//     });
//   });
});
