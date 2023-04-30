const logger = require('./logger') // Custom module for logging

const requestLogger = (req, res, next) => {
  logger.info(`request IP  ${req.ip}`, `request Method  ${req.method}`, `id  ${req.originalUrl}`)
  next()
}

const unkownIdHandler = (req, res) => {
  res.status(404).send('Note not found').end()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unkownIdHandler,
  errorHandler,
}
