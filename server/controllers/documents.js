import { Documents } from '../models/';
import Helpers from '../helpers';

const documentsController = {
  createDocument(req, res) {
    const { documentName, description, content, access } = req.body;
    return Documents.create({
      documentName,
      description,
      content,
      access,
      creatorId: req.user.id
    })
      .then((document) => {
        res.status(201)
        .send({
          document
        });
      })
      .catch(() => res.status(403)
      .send({
        message: 'No field can be empty'
      }));
  },

  listDocuments(req, res) {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
    const queryDocs = Documents.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['updatedAt'] },
      where: {
        $or: [{
          access: {
            $not: 'private'
          }
        }, { creatorId: req.user.id }]
      },
      order: [['updatedAt', 'DESC']]
    });
    return queryDocs.then((documents) => {
      const pagination = Helpers.paginate(limit, offset, documents);
      res.status(200)
      .send({
        pagination,
        documents: documents.rows
      });
    })
    .catch(() => res.status(409).send({
      message: 'Documents could not be retrieved'
    }));
  },

  retrieveDocument(req, res) {
    return Documents.findById(req.params.id)
      .then(document =>
        res.status(200)
        .send({
          document
        })
      )
      .catch(() => res.status(409).send({
        message: 'Document could not be retrieved'
      }));
  },

  updateDocument(req, res) {
    const { documentName, description, content, access } = req.body;
    return Documents.findById(req.params.id)
    .then((document) => {
      if (document.creatorId !== req.user.id) {
        return res.status(401).send({
          message: 'You don\'t have access to this document',
        });
      }
      return document
        .update({
          documentName,
          description,
          content,
          access
        })
        .then(() => res.status(200)
        .send({
          document
        })
        )
        .catch(() => res.status(409).send({
          message: 'Fields cannot be left empty'
        }));
    })
      .catch(() => res.status(404).send({
        message: 'Document does not exist'
      }));
  },

  destroyDocument(req, res) {
    return Documents.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'The document cannot be found therefore cannot be deleted'
          });
        }
        if (document.creatorId !== req.user.id) {
          return res.status(401).send({
            message: 'You don\'t have access to this document',
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({
            message: 'Document deleted successfully.'
          }))
          .catch(() => res.status(409).send({
            message: 'Could not delete document'
          }));
      })
      .catch(error => res.status(500).send(error));
  }
};

export default documentsController;
