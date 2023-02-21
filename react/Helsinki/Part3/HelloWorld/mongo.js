const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log(`Give password and argument`)
    process.exit(1)
}

const password = 'Skhirate_88'
const appName= 'noteApp'

const url = `mongodb+srv://yslaoui:${password}@cluster0.9uqoxi0.mongodb.net/${appName}?retryWrites=true&w=majority`

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

note.save().then(resulut=>{
    console.log(`note saved !`)
    mongoose.connection.close()
})

*/

// finding a note
Note.find({important:true}).then(result=>{
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


  