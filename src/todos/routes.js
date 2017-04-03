import express from 'express';
import { validate } from 'isvalid';
import { errors } from 'express-simple-errors';
import transformResponse, { schema } from './model'; // eslint-disable-line no-unused-variables
import db from '../db';
const todoTable = 'todos';

export default function ()  {
  const router = express.Router();

  router.route('/')
    .get(getAllTodos, returnResponse)
    .post(validate.body(schema), createTodo, returnResponse)
    .delete(clearTodos, returnResponse);

  router.route('/:id')
    .all(getOneTodo)
    .get(returnResponse)
    .patch(patchTodo, returnResponse)
    .delete(deleteTodo, returnResponse);

  async function getAllTodos(req, res, next) {
    res.locals.todos = await db.all(todoTable)
    .catch((err) => next(err));
    next();
  }

  async function clearTodos(req, res, next) {
    const rows = await db.clear(todoTable)
    .catch((err) => next(err));
    res.locals.todos = rows;
    res.status(204);
    next();
  }

  async function createTodo(req, res, next) {
    if (req.body.order) {
      req.body.position = req.body.order;
      delete req.body.order;
    }
    const todo = await db.create(todoTable, req.body)
    .catch((err) => next(err));
    res.locals.todo = todo[0];
    res.status(201);
    next();
  }

  async function getOneTodo(req, res, next) {
    const todo = await db.getById('todos', req.params.id)
    .catch((err) => next(err));
    res.locals.todo = todo && todo[0];
    if (!res.locals.todo) {
      return next(new errors.NotFound('This todo does not exist'));
    }
    next();
  }

  async function patchTodo(req, res, next) {
    const todo = Object.assign({}, res.locals.todo[0], req.body);
    if (todo.order) {
      todo.position = todo.order;
      delete todo.order;
    }

    const updatedTodo = await db.update(todoTable, req.params.id, todo)
    .catch((err) => next(err));
    res.locals.todo = updatedTodo[0];
    next();
  }

  async function deleteTodo(req, res, next) {
    res.locals.todo = await db.deleteById(todoTable, req.params.id)
    .catch((err) => next(err));
    res.status(204);
    next();
  }

  function returnResponse(req, res) {
    // handle no responses here
    res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(transformResponse(res.locals));
  }

  return router;
}
