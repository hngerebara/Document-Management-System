import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import router from '../routes/';
import auth from './middlewares/auth';
import cors from 'cors';

const app = express();
const authMiddleware = auth();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../', '/dist')));

// middleware for token authentication
app.use(authMiddleware.initialize());

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});


export default app;
