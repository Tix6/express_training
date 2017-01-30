const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));

/* used to disable error code 304 on refreshed requests */
app.disable('etag');

/*
** /ping
*/

app.get('/ping', (req, res) => res.send({ping: 'pong'}));

/*
** /add
*/

const addRouter = express.Router();

const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({ error: 'params should be integers.' });
};

/* middleware */
addRouter.use(bodyParser.json());
addRouter.use(errorHandler);

const add = (values, res) => {
  const x = parseInt(values[0]);
  const y = parseInt(values[1]);
  if (isNaN(x) || isNaN(y))
    res.status(500);
  return res.json({result: x + y});
};

addRouter.get('/:x/:y', (req, res) => {
  const { x, y } = req.params;
  add([x, y], res);
});

addRouter.get('/', (req, res) => {
  const { op1, op2, ops } = req.query;
  if (!(op1 && op2) && !ops) {
    res.status(500);
    return res.send('');
  }
  const values = (op1 && op2) ? [op1, op2] : ops.split(',');
  add(values, res);
});

const sum = (values, res) => {
  const parsedValues = values.map(v => parseInt(v));
  const result = parsedValues.reduce((acc, item) => acc + item);
  return res.json({result});
};

addRouter.post('/', (req, res) => {
  sum(req.body.values, res);
});

app.use('/add', addRouter);

/*
** public
*/

app.use('/', express.static('public'));

app.listen(process.argv[2] || 8080);
