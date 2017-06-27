import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../config/app';
// import Documents from '../models/documents';

const expect = chai.expect;

chai.use(chaiHttp);
// Create update and delete works but I need to clear the db first.
describe('Route: Documents', () => {
  //   beforeEach((done) => {
  //     Documents.sync({ force: true })
  //      .then(() => {
  //        console.log('getting called');
  //        done();
  //      });
  //   });

  const document = {
    documentName: 'TestDocument1',
    description: 'Description of testdocument',
    content: 'hello content of test document',
  };
  describe('/POST Documents', () => {
    it('should not allow cretion of document withou login', (done) => {
      chai.request(app).post('/documents').send(document).end((err, res) => {
      expect(res).to.have.status(401);
      expect(res.text).to.equal('Unauthorized');
      done();
    });
    });

    it('it should succesfully post only if user is loggedin', (done) => {
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
          .post('/documents')
          .set('Authorization', `JWT ${res.body.token}`)
          .send(document)
          .end((err, res) => {
            expect(res.body.document).to.be.a('object');
            expect(res.body.message).to.equal(
              'Yay!! you have successfully created a new document'
            );
            expect(res.body.document).to.include.keys(
              'id',
              'documentName',
              'description',
              'content',
              'createdAt',
              'updatedAt'
            );
            done();
          });
      });
    });

    it('it should create documents with role access', (done) => {
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
          .post('/documents')
          .set('Authorization', `JWT ${res.body.token}`)
          .send({
            documentName: 'public documnet test',
            description: 'Description of test pulic document test',
            content: 'hello content of test of public document',
            access: 'public'
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal(
              'Yay!! you have successfully created a new document'
            );
            done();
          });
      });
    });

    it('it should create documents with role access', (done) => {
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
          .post('/documents')
          .set('Authorization', `JWT ${res.body.token}`)
          .send({
            documentName: 'role document test',
            description: 'Description of test role document test',
            content: 'hello content of test of role document',
            access: 'role'
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal(
              'Yay!! you have successfully created a new document'
            );
            done();
          });
      });
    });

    it('it should resturn SequelizeValidationError empty fields', (done) => {
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
          .post('/documents')
          .set('Authorization', `JWT ${res.body.token}`)
          .send({
            documentName: 'role document test',
            access: 'role'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.name).to.equal('SequelizeValidationError');
            done();
          });
      });
    });
  });


  describe('/GET Documents', () => {
    it('should allow Admin succesfully GET all the Documents', (done) => {
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
            .get('/documents/')
            .set('Authorization', `JWT ${res.body.token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body.documents).to.be.a('array');
              expect(res.body).to.be.a('object');
              expect(res.body.pagination).to.include.keys(
                'page_count',
                'page',
                'page_size',
                'total_count'
              );
              done();
            });
        });
    });
  });
});
