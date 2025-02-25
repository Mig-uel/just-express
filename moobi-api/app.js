var path = require('path')
var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')

const indexRouter = require('./routes')
const movieRouter = require('./routes/movie')
const searchRouter = require('./routes/search')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  const { api_key } = req.query

  console.log(api_key)

  if (!api_key || api_key.length < 6) {
    return res.status(401).json({ msg: 'Invalid API Key!' })
  }

  return next()
})

app.use('/', indexRouter)
app.use('/movie', movieRouter)
app.use('/search', searchRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  const status = err.status || 500
  return res.status(status).json(err)
})

module.exports = app
