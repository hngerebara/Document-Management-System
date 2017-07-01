import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import cfg from '../../../../server/configs/config';
import app from '../../../../server/app';
import { Users, sequelize, Roles } from '../../../../server/models';
// import Documents from '../models/documents';

const expect = chai.expect;

chai.use(chaiHttp);
// Create update and delete works but I need to clear the db first.
describe('Route: Documents', () => {
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

  describe('/POST Documents', () => {
    it('should not allow cretion of document without login', (done) => {
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

    it('it should resturn SequelizeValidationError empty fields', (done) => {
      chai
        .request(app)
        .post('/api/documents')
        .set('Authorization', `JWT ${token}`)
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
