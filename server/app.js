import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import allRoutes from './routes';
import auth from './configs/middlewares/auth';
import cors from 'cors';
require('dotenv').config();

const pathurl = path.join(__dirname, '/routes/*.js');

const app = express();
const router = express.Router();

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Hopeaz DMS API',
    version: '1.0.0',
    description: 'Describing RESTful API endpoints with Swagger'
  },
  host: process.env.NODE_EVN === 'development'
  ? 'localhost:8090'
  : 'hopeazdms.herokuapp.com',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: [
    './server/routes/documents.js',
    './server/routes/users.js',
    './server/routes/search.js',
    './server/routes/roles.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Cntrol-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Cache-Control',
    'Pragma, Origin, Authorization, Content-Type, X-Requested-with'
  ); //eslint-disable-line
  res.header('Access-Control-Allow-Headers', 'GET, PUT, POST, OPTIONS');
  res.send(swaggerSpec);
});

const authMiddleware = auth();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', '/public')));
app.use(authMiddleware.initialize());

allRoutes(router);
app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'dist', 'index.html'));
});

export default app;
