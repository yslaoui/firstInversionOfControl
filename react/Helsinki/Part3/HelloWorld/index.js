
require('dotenv').config() // this is for process.env to work
const Note = require('./models/note')
const http = require('http')
const express = require('express')




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



app.get('/notes', (req, res) => {
 Note.find({}).then(result => {
   res.json(result)
 })
})



app.get('/', (req, res) => {
   res.send('<p> Hello Guys</p>')
})


const PORT = process.env.PORT ||  3001
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})



