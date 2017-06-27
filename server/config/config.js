require('dotenv').config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {
    session: false
  },
  development: {
    username: 'hopeaz',
    password: null,
    database: 'dms_db',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'hopeaz',
    password: null,
    database: 'dms_test',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: 'postgres'
  }
};
module.exports = config;
