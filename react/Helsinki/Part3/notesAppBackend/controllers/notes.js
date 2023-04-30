const notesRouter = require('express').Router()
const Note = require('../models/note') // this loads the Note collection from mongoDB server in javascript friendly format
// Middleware that allows requests from all origins

// GET ROUTES

notesRouter.get('/', (req, res) => {
  // Find is a READ operation in CRUD
  Note.find({}).then((result) => {
    res.json(result)
  })
})

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.post('/', (req, res, next) => {
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

notesRouter.put('/:id', (req, res, next) => {
  const updatedNote = {
    content: req.body.content,
    important: req.body.important,
  }
  Note.findByIdAndUpdate(req.params.id, updatedNote, { new: true, runValidators: true, context: 'query' })
    .then((note) => res.json(note))
    .catch((error) => next(error))
})

// DELETE ROUTES
notesRouter.delete('/:id', (req, response, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error))
})

// Export
module.exports = notesRouter
