import { Users, Documents, Roles } from '../models';

const searchController = {
  searchDocuments(req, res) {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    const isAdmin = req.user.roleId === 1;
    const query = req.query.search || '';

    if (isAdmin) {
      return Documents.findAndCountAll({
        where: {
          $or: [
            { documentName: { $ilike: `%${query}%` } },
            { description: { $ilike: `%${query}%` } },
            { content: { $ilike: `%${query}%` } }
          ]
        },
        include: {
          model: Users,
          attributes: ['firstName', 'lastName']
        },
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        limit,
        offset
      })
        .then((documents) => {
          const next = Math.ceil(documents.count / limit);
          const currentPage = Math.floor(offset / (limit + 1));
          const pageSize = limit > documents.count ? documents.count : limit;
          if (documents.length <= 0) {
            return res.status(404).send({
              documents: [],
              message: `no results found for ${req.query.search}`
            });
          }
          return res.status(200).send({
            searchPagination: {
              pageCount: next,
              page: currentPage,
              pagesize: pageSize,
              totalCount: documents.count
            },
            searchDocuments: documents.rows
          });
        })
        .catch(() =>
          res.status(409).send({
            message: 'Error occurred while searching for documents'
          })
        );
    }
    return Documents.findAndCountAll({
      where: {
        $and: [
          {
            $or: [
              { access: 'public' },
              {
                $and: [{ access: 'role' }, { creatorId: req.user.roleId }]
              }
            ]
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
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      limit,
      offset
    })
      .then((documents) => {
        const next = Math.ceil(documents.count / limit);
        const currentPage = Math.floor(offset / (limit + 1));
        const pageSize = limit > documents.count ? documents.count : limit;

        return res.status(200).send({
          searchPagination: {
            pageCount: next,
            page: currentPage,
            rowsPerPage: pageSize,
            totalCount: documents.count
          },
          searchDocuments: documents.rows
        });
      })
      .catch(() =>
        res.status(400).send({
          message: 'Error occurred while searching for documents'
        })
      );
  },

  searchUsers(req, res) {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    const query = req.query.search || '';
    return Users.findAndCountAll({
      where: {
        $or: [
          { username: { $ilike: `%${query}%` } },
          { firstName: { $ilike: `%${query}%` } },
          { lastName: { $ilike: `%${query}%` } },
          { email: { $ilike: `%${query}%` } }
        ]
      },
      include: {
        model: Roles,
        attributes: ['title']
      },
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['password', 'updatedAt', 'createdAt'] },
      limit,
      offset
    })
      .then((users) => {
        const next = Math.ceil(users.count / limit);
        const currentPage = Math.floor((offset / limit) + 1);
        const pagesize = limit > users.count ? users.count : limit;
        return res.status(200).send({
          searchPagination: {
            pageCount: next,
            pageNo: currentPage,
            rowsPerPage: pagesize,
            totalCount: users.count
          },
          searchUsers: users.rows
        });
      })
      .catch(() =>
        res.status(409).send({
          message: 'Error occurred while searching for users'
        })
      );
  }
};

export default searchController;
