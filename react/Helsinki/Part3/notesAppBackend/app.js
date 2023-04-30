//* **** IMPORT STATEMENTS******** */
//* ****************************** */
// Built-in libraries
const express = require('express') // Built-in Library for web server functionalities of Node.js ie route handling and middleware
const mongoose = require('mongoose') // Built-in Library for database interaction
const cors = require('cors') // Built-in cors middleware library

// Refactored modules
const logger = require('./utils/logger') // Custom module for logging
const config = require('./utils/config') // Custom module for environment variables
const notesRouter = require('./controllers/notes') // Custom module for route handlers
const middleWare = require('./utils/middleware')

//* **** CREATING EXPRESS APPLICATION******** */
//* ****************************** */
const app = express()

//* **** CONNECTING TO DATABASE ************** */
//* ****************************************** */
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Successfully connected to MONGODB'))
  .catch((error) => logger.error('error connecting to MongoDB', error.message))

//* **** MIDDLEWARE ************** */
//* ****************************** */

// Built-in middleware
app.use(cors()) // Middleware that allows requests from all origins
app.use(express.static('build')) // Middleware allows express.js to work with static js front end files generated with npm run build
app.use(express.json()) // for turning data of content-type app/json into a Javascript object

// Custom (Build by me) middleware
app.use(middleWare.requestLogger)

//* **** ROUTES FOR HANDLING HTTP REQUESTS ************** */
//* ********************************** */
// The react page is in localshost/3001.
// The server listens to port 3001
// The server serves the whole JSON data in localshost/3001/notes
// The server serves each resource in localshost/3001/notes/:id

app.use('/notes', notesRouter)

// ***** ERROR HANDLER MIDDLEWARE ************** */
//* ****************************** */

app.use(middleWare.unkownIdHandler)
app.use(middleWare.errorHandler)

module.exports = app
