import { Users, Documents } from '../models';

const searchController = {
  searchDocuments(req, res) {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
    const isAdmin = req.user.roleTitle === '1';
    const query = req.query.search;
    let queryDocs;
    if (isAdmin) {
      queryDocs = Documents.findAndCountAll({
        where: {
          $or: [{ documentName: { $iLike: `%${query}%` } },
            { content: { $iLike: `%${query}%` } }]
        },
        limit,
        offset
      });
    } else {
      queryDocs = Documents.findAndCountAll({
        where: {
          $or: [{
            access: {
              $not: 'private'
            }
          }, { documentName: { $iLike: `%${query}%` } },
            { content: { $iLike: `%${query}%` } }],
          $and: [{ creatorId: req.user.id }]
        },
        limit,
        offset,
      });
    }
    queryDocs.then((documents) => {
      const next = Math.ceil(documents.count / limit);
      const currentPage = Math.floor((offset / limit) + 1);
      const pageSize = limit > documents.count
      ? documents.count : limit;
      if (documents.length <= 0) {
        return res.status(200)
        .send({
          documents: [],
          message: 'Documents Not Found',
        });
      }
      return res.status(200)
      .send({
        searchPagination: {
          page_count: next,
          page: currentPage,
          page_size: Number(pageSize),
          total_count: documents.count
        },
        searchDocuments: documents.rows
      });
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
