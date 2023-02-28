//* **** IMPORT STATEMENTS******** */
//* ****************************** */
require('dotenv').config() // this is for process.env to work
const Note = require('./models/note') // this loads the Note collection from mongoDB server in javascript friendly format
const http = require('http')
const express = require('express') // Express allows node to define handlers for HTTP requests coming to the server

//* **** MIDDLEWARE ************** */
//* ****************************** */

// JSON parser middleware
const app = express()
// for turning data of content-type application/json into a Javascript object
app.use(express.json()) 

// Middleware that allows requests from all origins
const cors = require('cors')
const { nextTick } = require('process')

app.use(cors())

// Middleware allows express.js to work with static js front end files generated with npm run build
app.use(express.static('build'))

// request logger middleware

const requestLogger = (req, res, next) => {
  console.log(`request IP  ${req.ip}`, `request Method  ${req.method}`, `id  ${req.originalUrl}`)
  next()
}
app.use(requestLogger)

//* **** ROUTES FOR HANDLING HTTP REQUESTS ************** */
//* ********************************** */
// The react page is in localshost/3001.
// The server listens to port 3001
// The server serves the whole JSON data in localshost/3001/notes
// The server serves each resource in localshost/3001/notes/:id

// GET ROUTES

app.get('/notes', (req, res) => {
  // Find is a READ operation in CRUD
  Note.find({}).then((result) => {
    res.json(result)
  })
})

app.get('/notes/:id', (req, res, next) => {
  // FindByID is a READ operation in CRUD
  Note.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note)
    } else {
      next()
    }
  })
    .catch((error) => next(error))
})

// POST ROUTES

app.post('/notes', (req, res, next) => {
  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
  })

  // save() is  a CREATE request in the database (CREATE, READ, UPDATE, DELETE)
  note.save()
    .then((x) => res.json(x))
    .catch((error) => next(error))
})

// PUT ROUTES

app.put('/notes/:id', (req, res, next) => {
  const updatedNote = {
    content: req.body.content,
    important: req.body.important,
  }
  Note.findByIdAndUpdate(req.params.id, updatedNote, { new: true, runValidators: true, context: 'query' })
    .then((note) => res.json(note))
    .catch((error) => next(error))
})

// DELETE ROUTES
app.delete('/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error))
})

// ***** ERROR HANDLER MIDDLEWARE ************** */
//* ****************************** */

const unkownIdHandler = (req, res) => {
  res.status(404).send('Note not found').end()
}

app.use(unkownIdHandler)

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

//* **** SERVER ORIGIN PORT ************** */
//* ************************************** */

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
