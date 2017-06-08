import jwt from 'jsonwebtoken';
import { Users, Documents } from '../models';
import cfg from '../config/config';


const usersController = {
  create(req, res) {
    return Users
    .create({
      username: req.body.username.trim(),
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: req.body.password,
      levelId: req.body.levelId
    })
      .then((user) => {
        const payload = {
          username: user.username
        };
        const token = jwt.sign(payload, cfg.jwtSecret, {
          expiresIn: 60 * 60 * 24
        });
        res.send({
          message: 'User signed up succesfully',
          token
        });
      })
      .catch(error => res.status(400).send(error)
      );
  },

  list(req, res) {
    return Users.findAll({
      include: [
        {
          model: Documents,
          as: 'allDocuments'
        }
      ]
    })
      .then(users => res.status(200).send(users)
     )
      .catch(error => res.status(500).send(error)
     );
  },

  retrieve(req, res) {
    return Users.findById(req.params.id)
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).send(users);
      })
      .catch(error => res.status(400).send(error));
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
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).send(users);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Users.findById(req.params.id)
    .then((users) => {
      if (!users) {
        return res.status(404).send({
          message: 'User not found'
        });
      }
      return users
        .update({
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        })
        .then(() => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    });
  },

  destroy(req, res) {
    return Users.findById(req.params.id)
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'The user cannot be found therefore cannot be deleted'
          });
        }
        return users
          .destroy()
          .then(() => res.status(200).send({
            message: 'User deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({ where: { email } })
        .then((user) => {
          if (Users.IsPassword(user.password, password)) {
            const payload = {
              id: user.id
            };
            const token = jwt.sign(payload, cfg.jwtSecret, {
              expiresIn: 60 * 60 * 24
            });
            res.send({
              message: 'Successfully signed in',
              token
            });
          } else {
            res.status(401).json({ message: 'passwords did not match' });
          }
        });
    } else {
      res.status(404).json({
        message: 'Email or Password is Wrong'
      });
    }
  }
};

export default usersController;
