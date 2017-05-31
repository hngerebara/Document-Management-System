import { Users, Documents } from '../models';

const usersController = {
  create(req, res) {
    return Users.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(users => res.status(201).send(users))
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
            message: 'The user cannot be found therfore cannot be deleted'
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
  }
};

export default usersController;
