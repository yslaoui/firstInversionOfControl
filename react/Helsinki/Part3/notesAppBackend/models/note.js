const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

// SCHEMA
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

// Modifying the toJSON method to delete the __v attribute, rename _id into id, and turn it into a string, because it is actually and object
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// mongoose.model() creates a Javascript class representing the collection 'Note' that sits in the database. We export that Javascrit representation
module.exports = mongoose.model('Note', noteSchema)
