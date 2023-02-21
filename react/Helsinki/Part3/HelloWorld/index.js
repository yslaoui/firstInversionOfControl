
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')


// ***** MIDDLEWARE

// JSON parser middleware
const app = express()
app.use(express.json()) // for turning data of content-type application/json into a Javascript object


// Middleware that allows requests from all origins
const cors = require('cors')
app.use(cors())

// Middleware allows express.js to work with static js front end files generated with npm run build 
app.use(express.static('build'))

// **** Object literal that will be serverd as JSON

const password = process.env.MongoDBPassword
const appName= 'noteApp'

const url = `mongodb+srv://yslaoui:${password}@cluster0.9uqoxi0.mongodb.net/${appName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

app.get('/notes', (req, res) => {
  Note.find({}).then(result => {
    res.json(result)
  })
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/*
let notes = [
    {
      id: 1,
      content: "HTML is bof",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

 */ 

// **** Building routes with express.js
  

 app.get('/', (req, res) => {
    res.send('<p> Hello Guys</p>')
 }) 

 app.get('/notes/:id', (req, res) => {
    const id = req.params.id
    const showNote = notes.find(x=>{
      return x.id == Number(id)
    })
    console.log(showNote)
    // The if handles the case where the re request id doe snot exist
    if (showNote) {
      res.json(showNote)
    }
    else {
      res.status(404).end()
    }    
 })

 app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(x =>x.id !== id)
    res.status(204).end()
 }) 


 app.post('/notes', (req, res) => {
  
  const generateId = () => {
    const maxId = notes.length ==0 ? 0 :   Math.max(...notes.map(x=>x.id))
    return maxId+1
  }
  const body = req.body  
  if (!body) {
    return res.status(404).send("error") 
  }  
  
  const note = {
    id: generateId(),
    content: body.content, 
    important: body.important || false
  }
  notes.concat(note)
  console.log(note)
  res.send(note)
 })


const PORT = process.env.PORT ||  3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



