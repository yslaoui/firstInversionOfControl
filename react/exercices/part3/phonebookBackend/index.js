// IMPORTS
const http = require('http');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); // this is for process.env to work

// MIDDLEWARE

const app = express();
// Middleware turn strings into JSON
app.use(express.json());

// Middleware that allows requests from all origins
const cors = require('cors');
app.use(cors());

// Middleware that reads front end from build
app.use(express.static('build'));


// Middleware request logger
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));

// Data served
let notes = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

/// ****** ROUTE HANDLERS *** ///

// GET
app.get('/', (req, res) => {
  res.send('<p> Hello World </p>');

});
app.get('/persons', (req, res) => res.json(notes));

app.get('/info', (req, res) => {
  const p1 = `<p> Phonebook has info for ${notes.length} people </p>`;
  const p2 = `${new Date()}`;
  res.send(p1 + p2);
});

app.get('/persons/:id', (req, res) => {
  const id = req.params.id;
  const requestedNote = notes.filter((x) => x.id.toString() === id);
  console.log(requestedNote);
  if (requestedNote.length === 0) {
    return res.status(404).end();
  }
  return res.json(requestedNote);
});

// DELETE
app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((x) => !(x.id === id));
  res.status(204).end();
});

// POST
app.post('/persons', (req, res) => {
  if (req.body.name === undefined || req.body.number === undefined) {
    return res.status(400).send({ error: 'name or number is missing' });
  }
  const names = notes.map((x) => x.name);
  if (names.includes(req.body.name)) {
    return res.status(500).send({ error: 'name must be unique' });
  }
  const newNote = {
    id: Math.floor(Math.random() * 1001),
    name: req.body.name,
    number: req.body.number,
  };
  notes = notes.concat(newNote);
  return res.status(200).send(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
