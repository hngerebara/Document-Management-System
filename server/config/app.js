import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from '../routes/';
import auth from './middlewares/authentication';

const app = express();
const authMiddleware = auth();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(authMiddleware.initialize());
app.use(router);

export default app;

