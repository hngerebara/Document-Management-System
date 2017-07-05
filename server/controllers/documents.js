import { Documents } from '../models/';

const documentsController = {
  createDocument(req, res) {
    return Documents.create({
      documentName: req.body.documentName,
      description: req.body.description,
      content: req.body.content,
      access: req.body.access,
      creatorId: req.user.id
    })
      .then((document) => {
        res.status(201)
        .send({
          message: 'Yay!! you have successfully created a new document',
          document
        });
      })
      .catch(error => res.status(409)
      .send({
        message: 'So sorry, your document could not be created',
        error
      }));
  },

  listDocuments(req, res) {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
    const isAdmin = req.user.roleId === 1;
    let queryDocs;
    if (isAdmin) {
      queryDocs = Documents.findAndCountAll({
        limit,
        offset
      });
    } else {
      queryDocs = Documents.findAndCountAll({
        limit,
        offset,
        where: {
          $or: [{
            access: {
              $not: 'private'
            }
          }, { creatorId: req.user.id }]
        }
      });
    }
    return queryDocs.then((documents) => {
      const next = Math.ceil(documents.count / limit);
      const currentPage = Math.floor((offset / limit) + 1);
      const pagesize = limit > documents.count
      ? documents.count : limit;
      res.status(200)
      .send({
        pagination: {
          pageCount: next,
          page: currentPage,
          rowsPerPage: Number(pagesize),
          totalCount: documents.count
        },
        documents: documents.rows
      });
    })
    .catch(error => res.status(400).send(error));
  },

  retrieveDocument(req, res) {
    return Documents.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
          .send({
            message: 'Document Not Found'
          });
        }
        return res.status(200)
        .send({
          message: 'Document successfully retrieved',
          document
        });
      })
      .catch(error => res.status(400).send(error));
  },

  updateDocument(req, res) {
    return Documents.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document not found'
        });
      }
      if (document.creatorId !== req.user.id) {
        return res.status(401).send({
          message: 'You don\'t have access to this document',
        });
      }
      return document
        .update({
          documentName: req.body.documentName,
          description: req.body.description,
          content: req.body.content,
        })
        .then(() => res.status(200)
        .send({
          message: 'You have succesfully updated this document',
          document
        })
        )
        .catch(error => res.status(400).send(error));
    });
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
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  }
};

export default documentsController;
