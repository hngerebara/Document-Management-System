require("dotenv").config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {
    session: false
  }
};
module.exports = config;
