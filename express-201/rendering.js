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

app.get('/', (req, res) => {
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
   */
  return res.render('index')
})

app.listen(3000, () => console.log('SERVER RUNNING'))
