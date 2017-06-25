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
          return res.status(200)
            .send({
              document: [],
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
  },

  searchUsers(req, res) {
    const query = req.query.search;
    return Users
      .findAll({
        where: {
          $or: [{ username: { $iLike: `%${query}%` } },
            { firstName: { $iLike: `%${query}%` } },
            { lastName: { $iLike: `%${query}%` } },
            { email: { $iLike: `%${query}%` } }]
        }
      })
      .then((users) => {
        if (users.length <= 0) {
          return res.status(200)
            .send({
              users: [],
              message: 'User Not Found',
            });
        }
        return res.status(200)
          .send({ users });
      })
      .catch(error => res.status(400)
        .send({
          error,
          message: 'Error occurred while retrieving User'
        }));
  }
};

export default searchController;
