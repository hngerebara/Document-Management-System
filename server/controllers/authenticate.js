import jwt from 'jwt-simple';
import cfg from '../config/config';
import { Users } from '../models';

const authenticate = {
  getToken(req, res) {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() / 1000);
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({ where: { email } })
        .then((user) => {
          if (Users.IsPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        });
    } else {
      res.sendStatus(401);
    }
  }
};

export default authenticate;
