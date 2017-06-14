import { Documents } from '../models/';

const documentsController = {
  create(req, res) {
    return Documents.create({
      documentName: req.body.documentName,
      description: req.body.description,
      content: req.body.content,
      access: req.body.access,
      creatorId: req.params.creatorId
    })
      .then(documents => res.status(201).send(documents))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Documents.findAll()
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
    .then((documents) => {
      if (!documents) {
        return res.status(404).send({
          message: 'Document not found'
        });
      }
      return documents
        .update({
          documentName: req.body.documentName,
          description: req.body.description,
          content: req.body.content,
        })
        .then(() => res.status(200).send(documents))
        .catch(error => res.status(400).send(error));
    });
  },
  destroy(req, res) {
    return Documents.findById(req.params.id)
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({
            message: 'The document cannot be found therefore cannot be deleted'
          });
        }
        return documents
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
