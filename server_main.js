const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));

/* used to disable error code 304 on refreshed requests */
app.disable('etag');

let id = 0;
let todos = [];

const todosRouter = express.Router();

const sendError = (message, res) => {
  res.status(500);
  res.json({ error: message });
};

const errorHandler = (err, req, res, next) => {
  const { method } = req;
  sendError(`invalid request ${method}.`, res);
};

/* middleware */
todosRouter.use(bodyParser.json());
todosRouter.use(errorHandler);

todosRouter.get('/', (req, res) => {
  res.json([...todos]);
});

todosRouter.post('/', (req, res) => {
  const { todo } = req.body;
  if (!todo)
    return sendError('undefined todo.', res);
  const todoWithId = {...todo, id: (id += 1)};
  todos.push(todoWithId);
  res.json(todoWithId);
});

const isUnrecognizedTodo = (id) => {
  return (!id || isNaN(parseInt(id)) || !todos.some(todo => todo.id === id));
}

todosRouter.put('/', (req, res) => {
  const { todo, todo: { id } } = req.body;
  if (!todo || isUnrecognizedTodo(id))
    return sendError('undefined todo or invalid id.', res);
  todos = todos.map(t => (t.id === id) ? todo : t);
  res.json(todo);
});

todosRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isUnrecognizedTodo(id))
    return sendError('invalid id.', res);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ id });
});

app.use('/api/todos', todosRouter);
app.listen(process.argv[2] || 8080);
