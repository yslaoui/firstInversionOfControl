const mongoose = require('mongoose')

const password = process.env.MongoDBPassword
const appName= 'noteApp'


const url = `mongodb+srv://yslaoui:${password}@cluster0.9uqoxi0.mongodb.net/${appName}?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)


const noteSchema = new mongoose.Schema({
 content: String,
 important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
   })
   



module.exports = mongoose.model('Note', noteSchema)