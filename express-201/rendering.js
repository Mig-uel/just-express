const path = require('path')
const helmet = require('helmet')
const express = require('express')

const app = express()

/** middlewares */
app.use(helmet())
app.use(express.json()) // parse json body
app.use(express.urlencoded({ extended: false })) // parse urlencoded body
app.use(express.static('public')) // serve static files

/**
 * app.set() takes in two args: name, value
 * sets application options
 */
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views')) // can be passed multiple dirs

function validateUser(req, res, next) {
  res.locals.validated = true
  return next()
}

app.get('/', validateUser, (req, res) => {
  /**
   * we define a view engine:
   * ejs
   * mustache
   * handlebars
   * pug
   *
   * to use res.render:
   * we pass the file we want to use
   * the data we want to send to that file
   *
   * express uses the node module for our specified view engine and parses the file
   *
   * the final result is a compile product of the things that browser can handle
   *
   * the data in the second arg is going to be appended to res.locals
   *
   * we are in the response therefore we can access res properties such as locals
   */
  return res.render('index', {
    msg: 'failure',
    msg2: 'hello',

    // html came from db and we want to pass it to the view engine
    html: '<p>hey there</p>',
  })
})

app.listen(3000, () => console.log('SERVER RUNNING'))
