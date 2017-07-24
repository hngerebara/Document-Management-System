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
  const emptyDocument = {
    documentName: '',
    description: '',
    content: ''
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
        .send(emptyDocument)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.unauthorized).to.equal(true);
          done();
        });
    });

    it('should not allow creation of document with empty fields', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .set('Authorization', `JWT ${token}`)
        .send(emptyDocument)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.eql('No field can be empty');
          done();
        });
    });

    it('should succesfully create a new document', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .set('Authorization', `JWT ${token}`)
        .send(document)
        .end((err, res) => {
          const response = res.body.document;
          expect(response).to.be.a('object');
          expect(response).to.include.keys(
            'access',
            'id',
            'documentName',
            'description',
            'content'
          );
          expect(response).to.have.property('id').eql(1);
          expect(response).to.have.property('access').eql('private');
          expect(response.creatorId).to.eql(1);
          expect(response).to.have.property('description').eql('Description of testdocument');
          done();
        });
    });

    it('should create a document with public access', (done) => {
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
          const response = res.body.document;
          expect(res).to.have.status(201);
          expect(response.access).to.eql('public');
          done();
        });
    });

    it('should create a document with role access', (done) => {
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
          const response = res.body.document;
          expect(res).to.have.status(201);
          expect(response.access).to.eql('role');
          done();
        });
    });
  });

  describe('/GET Documents', () => {
    it('should allow Admin succesfully retrieve all Documents', (done) => {
      chai
        .request(app)
        .get('/api/documents/')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          const response = res.body;
          expect(res).to.have.status(200);
          expect(response).to.be.a('object');
          expect(response.documents).to.be.a('array');
          expect(response.pagination).to.be.a('object');
          expect(response.pagination).to.include.keys(
            'pageCount',
            'page',
            'rowsPerPage',
            'totalCount'
          );
          expect(response.documents).to.have.length(3);
          expect(response.documents[2].id).to.eql(1);
          expect(response.documents[2].access).to.eql('private');
          done();
        });
    });
  });

  describe('/GET document by id', () => {
    it('should retrieve a document based the id ', (done) => {
      chai
     .request(app)
        .get('/api/documents/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          const response = res.body.document;
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.null;
          expect(res.body).to.be.an.instanceof(Object);
          expect(response).to.property('documentName').eql('TestDocument1');
          expect(response).to.have.property('description')
          .eql('Description of testdocument');
          expect(response).to.have.property('content')
          .eql('hello content of test document');
          expect(response).to.have.property('access').eql('private');
          expect(response).to.have.property('id').eql(1);
          done();
        });
    });
  });

  describe('/PUT update a document based on the id', () => {
    const document1 = {
      documentName: 'updated document',
      description: 'Description of test updated document',
      content: 'hello content of test of updated document',
      access: 'public'
    };

    it('should update the document with the given param', (done) => {
      chai
      .request(app)
        .put('/api/documents/1')
        .set('Authorization', `JWT ${token}`)
        .send(document1)
        .end((err, res) => {
          const response = res.body.document;
          expect(res.status).to.eql(200);
          expect(response.documentName).to.eql('updated document');
          expect(response.access).to.eql('public');
          done();
        });
    });
  });
  
  describe('/DELETE delete a document based on the id', () => {
    it('should delete the document with the given param', (done) => {
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
    it('should retrieve documents belonging to the loggedin user', (done) => {
      chai
      .request(app)
        .get('/api/users/1/documents')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          const response = res.body.user;
          expect(res.status).to.equal(200);
          expect(response).to.not.be.null;
          expect(response).to.be.a('object');
          expect(response).to.have.property('roleId')
          .to.eql(1);
          expect(response).to.have.property('username')
          .to.eql('HopeazAdmin');
          expect(response.allDocuments).to.be.a('array');
          expect(response.allDocuments).to.have.length(2);
          expect(response.allDocuments[0]).to.have.property('documentName')
          .to.eql('public documnet test');
          expect(response.allDocuments[1]).to.have.property('documentName')
          .eql('role document test');
          expect(response.allDocuments[0]).to.have.property('creatorId').eql(1);
          done();
        });
    });
  });
});

