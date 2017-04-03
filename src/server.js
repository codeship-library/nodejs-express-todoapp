import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ErrorHandler from 'express-simple-errors';
import routes from './todos/routes';

const app = express();

// app middleware
app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));
app.disable('etag');

app.use('/todos', routes());

const errorHandler = new ErrorHandler();

// validation errors are not typed correctly - changing here
app.use((err, req, res, next) => {
  if (err.validator) {
    err.name = 'ValidationError';
    err.code = 400;
  }
  next(err);
});

errorHandler.setHandler('ValidationError', function validationHandler (err, stack) {
  const res = {};
  res.status = 'Error';
  res.message = `Schema Validation Error: ${err.message}`;
  res.code = err.code;
  if (stack) res.stackTrace = err.stack;
  return res;
});

app.use(errorHandler.middleware());

export default app;
