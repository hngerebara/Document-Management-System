import { ExtractJwT } from 'passport-jwt';

const config = {
    "jwtSecret": "DM$-AP1",
    "jwtSession": {
      "session": false
      }
}
module.exports = config;
