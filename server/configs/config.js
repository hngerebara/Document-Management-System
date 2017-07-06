require('dotenv').config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {
    session: false
  },
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: 'postgres'
  }
};
module.exports = config;
