import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users, Documents, Roles } from '../models';
import cfg from '../configs/config';

const salt = bcrypt.genSaltSync();
const userSchema = user => ({
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  roleId: user.roleId,
});

const usersController = {
  createUser(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    return Users.create({
      username,
      firstName,
      lastName,
      email,
      password,
      roleId: 2
    })
      .then((user) => {
        const payload = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          email: user.email,
          roleId: user.id
        };
        const token = jwt.sign(payload, cfg.jwtSecret, {
          expiresIn: 60 * 60 * 24
        });
        return res.status(201).send({
          user: userSchema(user),
          token
        });
      })
      .catch(() =>
        res.status(409).send({
          message: 'User email or password already exists'
        })
      );
  },

  listAllUsers(req, res) {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    return Users.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Roles,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })
      .then((users) => {
        const next = Math.ceil(users.count / limit);
        const currentPage = Math.floor((offset / limit) + 1);
        const pageSize = limit > users.count ? users.count : limit;
        res.status(200).send({
          pagination: {
            pageCount: next,
            page: currentPage,
            rowsPerPage: Number(pageSize),
            totalCount: users.count
          },
          users: users.rows
        });
      })
      .catch(() =>
        res.status(400).send({
          message: 'Users could not be retrieved',
        })
      );
  },

  retrieveUser(req, res) {
    Users.findOne({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: {
        $or: [{ id: req.params.id }]
      }
    }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: `User with id ${req.params.id} does not exist` });
      }
      res.status(200).send({
        user
      });
    });
  },

  retrieveAll(req, res) {
    return Users.findById(req.params.creatorId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Documents,
          as: 'allDocuments',
          attributes: { exclude: ['updatedAt'] }
        }
      ]
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).send({
          user
        });
      })
      .catch(error => res.status(400).send(error));
  },

  updateUser(req, res) {
    const queryId = req.params.id;
    const userId = req.user.id;
    let encryptedPassword;
    const request = req.body;
    if (request.password) {
      encryptedPassword = bcrypt.hashSync(request.password, salt);
    }
    if (parseInt(userId, 10) === parseInt(queryId, 10)) {
      return Users.findById(queryId, {
        attributes: { exclude: ['createdAt'] }
      })
      .then((user) => {
        user.update({
          userName: request.userName || user.username,
          firstName: request.firstName || user.firstName,
          lastName: request.lastName || user.lastName,
          email: request.email || user.email,
          password: encryptedPassword || user.password,
        })
          .then(() =>
            res.status(200).send({
              user
            })
        )
          .catch(() =>
            res.status(409).send({
              message: 'You had some errors updating your profile. Please check details entered'
            })
          );
      });
    }
    return res.status(401).send({
      message: 'You have no rights to update this profile'
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
          .catch(() =>
            res.status(409).send({
              message: 'An error occured while attempting to delete user'
            })
          );
      })
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({
        where: { email }
      })
        .then((user) => {
          if (Users.comparePassword(user.password, password)) {
            const payload = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              password: user.password,
              email: user.email,
              roleId: user.id
            };
            const token = jwt.sign(payload, cfg.jwtSecret, {
              expiresIn: 60 * 60 * 24
            });
            return res.status(200).send({
              token
            });
          }
          return res.status(401).send({
            message: 'Incorrect Password'
          });
        })
        .catch(() => {
          res.status(401).send({
            message: 'Your details are incorrect..Try again'
          });
        });
      return;
    }
    return res.status(400).send({
      message: 'Enter a valid email and password'
    });
  },

  checkUsername(req, res) {
    const username = req.params.username;
    Users.findOne({ where: { username } }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'username already exist'
        });
      }
      return res.status(200).send({
        message: 'successful'
      });
    });
  },

  logout(req, res) {
    return res.status(200).send({ message: 'You have succesfully logged out' });
  }
};

export default usersController;
