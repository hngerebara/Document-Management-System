import { Roles, Users } from '../models';

const rolesController = {
  create(req, res) {
    return Roles
      .create({
        title: req.body.title
      })
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Roles
        .findAll({})
        .then(roles => res.status(200).send(roles))
        .catch(error => res.status(400).send(error));
  },
};

export default rolesController;
