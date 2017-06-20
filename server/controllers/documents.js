import { Documents } from '../models/';

const documentsController = {
  create(req, res) {
    return Documents.create({
      documentName: req.body.documentName,
      description: req.body.description,
      content: req.body.content,
      access: req.body.access,
      creatorId: req.user.id
    })
      .then(documents => res.status(201).send(documents))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Documents.findAll({
      where: {
        $or: [{
          access: {
            $not: 'private'
          }
        }, { creatorId: req.user.id }]
      }
    })
      .then(documents => res.status(200).send(documents))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Documents.findById(req.params.id)
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({
            message: 'Document Not Found'
          });
        }
        return res.status(200).send(documents);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
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
        .then(() => res.status(200).send(document))
        .catch(error => res.status(400).send(error));
    });
  },
  destroy(req, res) {
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
      .catch(error => res.status(400).send(error));
  }
};

export default documentsController;
