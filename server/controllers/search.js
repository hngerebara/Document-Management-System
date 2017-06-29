import { Users, Documents } from '../models';

const searchController = {
  searchDocuments(req, res) {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    const isAdmin = req.user.roleId === 1;
    const query = req.query.search || '';

    if (isAdmin) {
      return Documents.findAndCountAll({
        where: {
          $or: [{ documentName: { $ilike: `%${query}%` } },
          { description: { $ilike: `%${query}%` } },
            { content: { $ilike: `%${query}%` } }]
        },
        include: {
          model: Users,
          attributes: ['firstName', 'lastName']
        },
        limit,
        offset
      })
    .then((documents) => {
      const next = Math.ceil(documents.count / limit);
      const currentPage = Math.floor((offset / limit) + 1);
      const pageSize = limit > documents.count ? documents.count : limit;
      if (documents.length <= 0) {
        return res.status(200)
        .send({
          documents: [],
          message: `no results found for ${req.query.search}`,
        });
      }
      return res.status(200)
      .send({
        searchPagination: {
          page_count: next,
          page: currentPage,
          page_size: pageSize,
          total_count: documents.count
        },
        searchDocuments: documents.rows
      });
    })
    .catch(() => res.status(400)
        .send({
          message: 'Error occurred while retrieving documents'
        }));
    }
    return Documents.findAndCountAll({
      where: {
        $and: [{
          $or: [
                { access: 'public', },
            { $and: [
                  { access: 'role' },
                  { creatorId: req.user.roleId }
            ] },
          ],
        },
        {
          $or: [
                { documentName: { $ilike: `%${query}%` } },
          { description: { $ilike: `%${query}%` } },
            { content: { $ilike: `%${query}%` } }
          ]
        }
        ]
      },
      include: {
        model: Users,
        attributes: ['firstName', 'lastName']
      },
      limit,
      offset
    })
    .then((documents) => {
      const next = Math.ceil(documents.count / limit);
      const currentPage = Math.floor((offset / limit) + 1);
      const pageSize = limit > documents.count ? documents.count : limit;

      return res.status(200)
      .send({
        searchPagination: {
          page_count: next,
          page: currentPage,
          page_size: pageSize,
          total_count: documents.count
        },
        searchDocuments: documents.rows
      });
    })
    .catch(() => res.status(400)
        .send({
          message: 'Error occurred while retrieving documents'
        }));
  },

  searchUsers(req, res) {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    const query = req.query.search || '';
    return Users
      .findAll({
        where: {
          $or: [{ username: { $iLike: `%${query}%` } },
            { firstName: { $iLike: `%${query}%` } },
            { lastName: { $iLike: `%${query}%` } },
            { email: { $iLike: `%${query}%` } }]
        },
        include: {
          model: Users,
          attributes: ['firstName', 'lastName']
        },
        limit,
        offset
      })

      .then((users) => {
        const next = Math.ceil(documents.count / limit);
        const currentPage = Math.floor((offset / limit) + 1);
        const pageSize = limit > documents.count ? documents.count : limit;
        if (users.length <= 0) {
          return res.status(200)
            .send({
              users: [],
              message: 'User(s) Not Found',
            });
        }
        return res.status(200)
      .send({
        searchPagination: {
          page_count: next,
          page: currentPage,
          page_size: pageSize,
          total_count: documents.count
        },
        searchUsers: users.rows
      });
      })
      .catch(error => res.status(400)
        .send({
          error,
          message: 'Error occurred while retrieving User'
        }));
  }
};

export default searchController;
