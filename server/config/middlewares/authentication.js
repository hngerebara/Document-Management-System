import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from '../../models/';
import cfg from '../config';
 
const params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

export default () => {
    const strategy = new Strategy(params, (payload, done) => {
        Users.findById(payload.id)
        .then(user => {
            if (user) {
                return done(null, {
                    id: user.id
                });
            }
            return done(null, false);
        })
        .catch(error => done(error, null));
    });

    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
