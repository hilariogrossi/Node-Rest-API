const express = require('express');
const hello = require('.hello/routes');
const todos = require('.todos/routes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(logger());
app.use('/hello', hello);
app.use('/todos', todos);

app.use(errorHandler());

app
  .listen(3000, '0.0.0.0', () => {
    console.log('Server Started');
  })
  .once('error', (error) => {
    console.error(error);
    process.exit(1);
  });

