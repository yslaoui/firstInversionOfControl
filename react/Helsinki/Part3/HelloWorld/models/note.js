const mongoose = require('mongoose')
require('dotenv').config() // this is for process.env to work


const url = process.env.MONGODB_URI
// const url = 'mongodb+srv://yslaoui:Skhirate_88@cluster0.9uqoxi0.mongodb.net/noteApp?retryWrites=true&w=majority'


mongoose.set('strictQuery', false)
mongoose.connect(url)

// SCHEMA
const noteSchema = new mongoose.Schema({
 content: String,
 important: Boolean
})


// Modifying the toJSON method to delete the __v attribute, rename _id into id, and turn it into a string, because it is actually and object
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
   })

// mongoose.model() creates a Javascript class representing the collection 'Note' that sits in the database. We export that Javascrit representation 
module.exports = mongoose.model('Note', noteSchema)