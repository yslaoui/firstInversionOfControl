// IMPORTS
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
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

const Person = require('./models/person');
const { response } = require('express');
/// ****** ROUTE HANDLERS *** ///

// GET
app.get('/', (req, res) => {
  res.send('<p> Hello World </p>');
});

app.get('/persons', (req, res, next) => {
  Person
    .find({})
    .then((result) => res.json(result))
    .catch(error => next(error));
  // res.json(notes);
});

app.get('/info', (req, res) => {
  Person
    .find({})
    .then((result) => {
      const p1 = `<p> Phonebook has info for ${result.length} people </p>`;
      const p2 = `${new Date()}`;
      res.send(p1 + p2);
    });
});

app.get('/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then((result) => {
      if (result === null) return res.status(404).json({ error: 'not found' }).end();
      return res.json(result);
    })
    .catch(error => next(error));
});

// POST
app.post('/persons', (req, res, next) => {
  if (req.body.name === undefined || req.body.number === undefined) {
    return res.status(400).send({ error: 'name or number is missing' });
  }
  /* #TODO
  const names = notes.map((x) => x.name);
  if (names.includes(req.body.name)) {
    return res.status(500).send({ error: 'name must be unique' });
  }
  */
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson.save().then((savedNote) => {
    console.log('Note saved');
    res.status(200).json(savedNote);
  })
  .catch(error => next(error));
});

// DELETE
app.delete('/persons/:id', (req, res, next) => {
  console.log('deleted')
  Person
    .findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

// PUT ROUTES
app.put('/persons/:id', (req, res, next) => {
  console.log(req.body.name);
  console.log(req.body.number);
  const updatedPerson = {
    name: req.body.name,
    number: req.body.number
  }
  console.log(req.body.name);
  console.log(req.body.number);
  Person.findByIdAndUpdate( req.params.id, updatedPerson, {new: true})
  .then(person => res.json(person))
  .catch(error => next(error))
})


// *** ERROR HANDLER MIDDLEWARE *******/
// **************************** //

// const unkownIdHandler = (req, res) =>  {
//   res.status(404).send('Note not found').end()
// }

// app.use(unkownIdHandler)

const errorHandler = (error, req, res, next) => {
  if (error.name == 'CastError') {
    return res.status(400).json({error: 'malformatted id'})
  } if (error.name == 'ValidationError') {
    console.log(error.message)
    return res.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`)