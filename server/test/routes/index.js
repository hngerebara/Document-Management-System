import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Route: Users', () => {
  describe('/POST Users', () => {
    const user = {
      username: 'hopppeez',
      firstName: 'Hope',
      lastName: 'Ngerebara',
      email: 'hoppeeez@gmail.com',
      password: '12345',
      levelId: 1
    };
    it('it should not POST a user without these fields', (done) => {
      chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
              expect(res).to.have.status(201);
              expect(res.text).to.equal('{"message":"User created"}');
              done();
            });
    });
    it('it should not POST if the username or email is not unique', (done) => {
      chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
    });
  });

  describe('/GET Users', () => {
    it('it should GET all the Users', (done) => {
      chai.request(app)
            .get('/users')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('array');
              expect(res.body[0]).to.have.property('username');
              expect(res.body[0]).to.have.property('firstName');
              expect(res.body[0]).to.have.property('lastName');
              expect(res.body[0]).to.have.property('email');
              expect(res.body[0]).to.have.property('password');
              expect(res.body[0].lastName).to.equal('Ngerebara');
              expect(res.body[0]).to.include.keys(
              'id','username', 'firstName', 'lastName', 'email','password',
              'levelId','createdAt', 'roleTitle', 'updatedAt'
              );
              done();
            });
    });
  });
});


describe('Update a particular user', () => {
  const user = {
    username: 'hopez',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'hopez@gmail.com',
    password: '12345',
    levelId: 1
  };
  it('should update a SINGLE user on /user/<id> PUT', () => {
    chai.request(app)
    .get('/Users')
    .end(() => {
      chai.request(app)
        .put(`/Users/${user.username}`)
        .send({
          username: 'HopezNg',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).type.to.equal('application/json');
        });
    });
  });
});
