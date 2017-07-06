import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import cfg from '../../../../server/configs/config';
import app from '../../../../server/app';
import { Users, sequelize, Roles } from '../../../../server/models';

const expect = chai.expect;

chai.use(chaiHttp);
describe('Route: Documents', () => {
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

  const document = {
    documentName: 'TestDocument1',
    description: 'Description of testdocument',
    content: 'hello content of test document'
  };

  before((done) => {
    sequelize.sync({ force: true }).done(() => {
      Roles.bulkCreate(roles).then(() => {
        Users.create(admin).then((adminUser) => {
          const payload = {
            id: adminUser.id,
            username: adminUser.username,
            roleId: adminUser.roleId
          };
          token = jwt.sign(payload, cfg.jwtSecret, {
            expiresIn: 60 * 60 * 24
          });
          done();
        });
      });
    });
  });

  describe('/POST Documents', () => {
    it('should not allow creation of document without login', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .send(document)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('Unauthorized');
          done();
        });
    });

    it('it should succesfully post only if user is loggedin', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .set('Authorization', `JWT ${token}`)
        .send(document)
        .end((err, res) => {
          expect(res.body.document).to.be.a('object');
          expect(res.body.message).to.equal(
            'Yay!! you have successfully created a new document'
          );
          expect(res.body.document).to.include.keys(
            'access',
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

    it('it should create documents with public access', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .set('Authorization', `JWT ${token}`)
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

    it('it should create documents with role access', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .set('Authorization', `JWT ${token}`)
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

  describe('/GET Documents', () => {
    it('should allow Admin succesfully GET all the Documents', (done) => {
      chai
        .request(app)
        .get('/api/documents/')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.documents).to.be.a('array');
          expect(res.body).to.be.a('object');
          expect(res.body.pagination).to.include.keys(
            'pageCount',
            'page',
            'rowsPerPage',
            'totalCount'
          );
          done();
        });
    });
  });
  describe('/GET documet by id', () => {
    it('it should retrieve a dcument based on its id ', (done) => {
      chai
     .request(app)
        .get('/api/documents/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.null;
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.message).to.equal('Document successfully retrieved');
          expect(res.body.document).to.property('documentName');
          expect(res.body.document).to.have.property('description');
          expect(res.body.document).to.have.property('content');
          expect(res.body.document).to.have.property('access');
          expect(res.body.document).to.have.property('id').eql(1);
          done();
        });
    });
  });

  describe('/PUT updaate a document based on id', () => {
    const document1 = {
      documentName: 'updated document',
      description: 'Description of test updated document',
      content: 'hello content of test of updated document',
    };

    it('it should update the document with the given param', (done) => {
      chai
      .request(app)
        .put('/api/documents/1')
        .set('Authorization', `JWT ${token}`)
        .send(document1)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have succesfully updated this document');
          expect(res.body.document.documentName).to.equal('updated document');
          done();
        });
    });
  });
  
  describe('/DELETE delete a document based on id', () => {
    it('it should update the document with the given param', (done) => {
      chai
      .request(app)
        .delete('/api/documents/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Document deleted successfully.');
          done();
        });
    });
  });

  describe('/GET user documents', () => {
    it('it should retrieve documents belonging to a specific user', (done) => {
      chai
      .request(app)
        .get('/api/users/1/documents')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.null;
          expect(res.body.message).to.eql('Found user and retrieved documents');
          expect(res.body.user.allDocuments[0]).to.have.property('documentName');
          expect(res.body.user.allDocuments[0]).to.have.property('documentName').eql('public documnet test');
          expect(res.body.user.allDocuments[0]).to.have.property('description');
          expect(res.body.user.allDocuments[0]).to.have.property('content');
          expect(res.body.user.allDocuments[0]).to.have.property('content').eql('hello content of test of public document');
          expect(res.body.user.allDocuments[0]).to.have.property('creatorId').eql(1);
          done();
        });
    });
  });
});

