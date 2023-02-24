const mongoose = require('mongoose')
require('dotenv').config() // this is for process.env to work

/*
if (process.argv.length<3) {
    console.log(`Give password and argument`)
    process.exit(1)
}

const password = 'Skhirate_88'
const appName= 'noteApp'
*/
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)


/*
// Creating a note 
const note = new Note({
    content: 'Mangoose makes things easy', 
    important: true
})

note.save().then(result=>{
    console.log(`note saved !`)
    mongoose.connection.close()
})



// finding important notes
Note.find({important:true}).then(result=>{
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
*/

// finding all notes
Note.find({}).then(result=>{
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

  