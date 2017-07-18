import { Documents } from '../models/';

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
      }
    });
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
      .then(document =>
        res.status(200)
        .send({
          document
        })
      )
      .catch(error => res.status(400).send(error));
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
        .then(() => res.status(202)
        .send({
          document
        })
        )
        .catch(() => res.status(409).send({
          message: 'Fields cannot be left empty'
        }));
    })
      .catch(() => res.status(400).send({
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
          .catch(error => res.status(409).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

export default documentsController;
