
//***** IMPORT STATEMENTS******** */
//******************************* */
require('dotenv').config() // this is for process.env to work
const Note = require('./models/note') // this loads the Note collection from mongoDB server in javascript friendly format
const http = require('http')
const express = require('express') // Express allows node to define handlers for HTTP requests coming to the server


//***** MIDDLEWARE ************** */
//******************************* */

// JSON parser middleware
const app = express()
app.use(express.json()) // for turning data of content-type application/json into a Javascript object

// Middleware that allows requests from all origins
const cors = require('cors')
app.use(cors())

// Middleware allows express.js to work with static js front end files generated with npm run build
app.use(express.static('build'))


//***** ROUTES FOR HANDLING HTTP REQUESTS ************** */
//*********************************** */
// The react page is in localshost/3001. 
// The server listens to port 3001
// The server serves the whole JSON data in localshost/3001/notes
// The server serves each resource in localshost/3001/notes/:id


app.get('/notes', (req, res) => {
 // Find is a READ operation in CRUD 
 Note.find({}).then(result => {
   res.json(result)
 })
})

app.get('/notes/:id', (req, res)=> {
  // FindByID is a READ operation in CRUD
  Note.findById(req.params.id).then((note)=>{
    if (note) {
      res.json(note)
    }
    else {
      res.status(404).send('Note not found').end()
    }
  }).catch((error)=>{
    console.log(error)
    res.status(400).json({error: 'wrong id format'})
  })
})

app.post('/notes', (req, res)=> {
  
  if (req.body.content == undefined) {
    return res.status(404).json({error:'content missing'})
  }

  const note = new Note({
    content: req.body.content,
    important: req.body.important || false
  })

  // save() is  a CREATE request in the database (CREATE, READ, UPDATE, DELETE)
  note.save().then((x)=>{
    res.json(x)
  })
  
})

console.log(process.env)


//***** SERVER ORIGIN PORT ************** */
//*************************************** */

const PORT = process.env.PORT ||  3001
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})



