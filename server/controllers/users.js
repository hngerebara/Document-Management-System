import jwt from 'jsonwebtoken';
import { Users, Documents, Roles } from '../models';
import cfg from '../configs/config';

const usersController = {
  createUser(req, res) {
    return Users.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      roleId: 2
    })
      .then((user) => {
        const payload = {
          id: user.id,
          username: user.username,
          roleId: user.roleId
        };
        const token = jwt.sign(payload, cfg.jwtSecret, {
          expiresIn: 60 * 60 * 24
        });
        return res.status(201).send({
          message: 'User signed up succesfully',
          user,
          token
        });
      })
      .catch(error =>
        res.status(400).send({
          message: 'User email or password already exists',
          error
        })
      );
  },

  listAllUsers(req, res) {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    return Users.findAndCountAll({
      limit,
      offset,
      include: [{
        model: Roles
      }]
    })
      .then((users) => {
        const next = Math.ceil(users.count / limit);
        const currentPage = Math.floor(offset / limit + 1);
        const pageSize = limit > users.count ? users.count : limit;
        res.status(200).send({
          message: 'users successfully retrieved',
          pagination: {
            page_count: next,
            page: currentPage,
            page_size: Number(pageSize),
            total_count: users.count
          },
          users: users.rows
        });
      })
      .catch(error =>
        res.status(400).send({
          message: 'Users could not be retrieved',
          error
        })
      );
  },

  // listAllUsersAndDocs(req, res) {
  //   console.log(req,"kfjhkgjfvdj")
  //   return Users.findAll({
  //     include: [
  //       {
  //         model: Documents,
  //         as: 'allDocuments'
  //       }
  //     ]
  //   })
  //     .then(users =>
  //       res.status(200).send({
  //         message: 'Users and their documents retrieved succesfully',
  //         users
  //       })
  //     )
  //     .catch(error => res.status(400).send(error));
  // },

  retrieveUser(req, res) {
    Users.findOne({
      where: {
        $or: [
          // { email: req.params.id },
          // { username: req.params.id },
          { id: req.params.id }
        ]
      }
    }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: `User with id ${req.params.id} does not exist` });
      }
      res.status(200)
      .send({
        message: `User Found with id ${req.params.id} was found`,
        user
      });
    });
  },

  retrieveAll(req, res) {
    return Users.findById(req.params.creatorId, {
      include: [
        {
          model: Documents,
          as: 'allDocuments'
        }
      ]
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200)
        .send({ message: 'Found all users and their documents',
          user
        });
      })
      .catch(error => res.status(400).send(error));
  },

  updateUser(req, res) {
    return Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found'
        });
      }
    //  if (req.user.id === req.params.id) {
      return user
        .update({
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        })
        .then(() => res.status(200)
        .send({ message: 'User details updated',
          user
        }))
    // }
        .catch(error => res.status(400)
        .send({ message: 'You have no rights to update this profile',
          error }));
    });
  },

  destroyUser(req, res) {
    return Users.findById(req.params.id)
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'The user cannot be found therefore cannot be deleted'
          });
        }
        return users
          .destroy()
          .then(() =>
            res.status(200).send({
              message: 'User deleted successfully.'
            })
          )
          .catch(error => res.status(409)
          .send({ message: 'An error occured while attempting to delete user, Try again',
            error }));
      })
      .catch(error => res.status(400).send(error));
  },


  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return res.status(401).send({
              message: 'email or password did not match'
            });
          }
          if (Users.IsPassword(user.password, password)) {
            const payload = {
              id: user.id,
              username: user.username,
              roleId: user.id
            };
            const token = jwt.sign(payload, cfg.jwtSecret, {
              expiresIn: 60 * 60 * 24
            });
            res.send({
              message: 'Successfully signed in',
              token
            });
          } else {
            res.status(401).send({
              message: 'passwords did not match'
            });
          }
        })
        .catch((error) => {
          res.status(401).send({
            message: 'User not found',
            error
          });
        });
    }
  },

  logout(req, res) {
    res.send({ message: 'You have succesfully logged out' });
  }
};

export default usersController;
