const http = require('http');
const express = require('express');

const app = express();

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

app.get('/api/persons', (req, res) => res.json(notes));

app.get('/info', (req, res) => {
  const p1 = `<p> Phonebook has info for ${notes.length} people </p>`;
  const p2 = `${new Date()}`;
  res.send(p1 + p2);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const requestedNote = notes.filter((x) => x.id.toString() === id);
  console.log(requestedNote);
  if (requestedNote.length === 0) {
    return res.status(404).end();
  }
  return res.json(requestedNote);
});

// DELETE
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((x) => !(x.id === id));
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
