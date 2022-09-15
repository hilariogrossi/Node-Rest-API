const express = require('express');
const { TodosRepository } = require('./todos/repository');


const app = express();
app.use(express.json());

// GET hello
app.get('/hello', (req, res) => {
  res.status(200).send('Hello World!');
});

// ** TODOS **
const todosRepository = TodosRepository();

const NotFound = {
  error: 'Not Found',
  message: 'Resource not found',
};

// GET /todos/:id
app.get('/todos/id', async (req, res) => {
  const id = parseInt(req.params.id);
  const todo = await todosRepository.get(id);
  if (!todo) {
    res.status(404).send(NotFound);
    return;
  };

  res.status(200).send(todo);
  });

// POST /todos
app.post('/todos', (req, res) => {
  const todo = req.body;
  todosRepository.insert(todo).then(inserted => {
    res.status(201).send(inserted);
  });
});

app.get('hello/:name', (req, res) => {
  const name = req.params.name;
  res.status(200).send(`Hello ${name}!`);
});

app
  .listen(3000, '0.0.0.0', () => {
    console.log('Server Started');
  })
  .once('error', (error) => {
    console.error(error);
    process.exit(1);
  });

