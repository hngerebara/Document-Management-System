import { Users, Documents } from '../models';

const searchController = {
  searchDocuments(req, res) {
    const query = req.query.search;
    return Documents
      .findAll({
        where: {
          $or: [{ documentName: { $iLike: `%${query}%` } },
            { content: { $iLike: `%${query}%` } }]
        }
      })
      .then((document) => {
        if (document.length <= 0) {
          return res.status(404)
            .send({
              message: 'Documents Not Found',
            });
        }
        return res.status(200)
          .send({ document });
      })
      .catch(error => res.status(400)
        .send({
          error,
          message: 'Error occurred while retrieving documents'
        }));
  }
};

export default searchController;
