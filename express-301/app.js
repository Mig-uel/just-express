const path = require('path')
const helmet = require('helmet')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

/** middlewares */
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.get('/login', (req, res) => {
  /**
   * req has a query property in express
   * it contains properties for each key-value query
   */
  const {
    query: { msg },
  } = req

  return res.render('login', {
    msg: msg ?? '',
  })
})

app.get('/', (req, res) => {
  res.send('sanity check')
})

app.post('/process_login', (req, res) => {
  /**
   * req.body is made by urlencoded, which parses the http message
   */
  const { username, password } = req.body

  /**
   * check the db to see if user credentials are valid
   *
   * if they are valid:
   * save username in a cookie
   * send them to the welcome page
   */
  if (!password.length) return res.redirect('/login?msg=fail')

  /**
   * res.cookie() takes 2 args: name, value
   */
  res.cookie('username', username, {
    httpOnly: true,
    sameSite: 'strict',
  })

  /**
   * res.redirect() takes 1 arg: where to send the browser
   */
  return res.redirect('/welcome')
})

app.get('/welcome', (req, res) => {
  /**
   * req.cookies object will have a property for every named cookie
   * that has been set
   */
  const { username } = req.cookies

  if (!username) return res.redirect('/login')

  return res.render('welcome', {
    username,
  })
})

app.get('/logout', (req, res) => {
  /**
   * res.clearCookie takes 1 arg: cookie to clear
   */
  res.clearCookie('username')

  return res.redirect('/login')
})

/**
 * app.params(): takes 2 args
 * param to look for in the route
 * the callback to run
 */
app.param('id', (req, res, next, id) => {
  /**
   * useful for checking the param
   * storyId vs. blogId
   */
  console.log(id)

  return next()
})

app.get('/story/:id', (req, res) => {
  /**
   * req.params is an object that will have a property for every params
   */
  return res.send(`STORY ${req.params.id}`)
})

app.get('/statement', (req, res) => {
  const date = new Date().toISOString()

  /**
   * download method takes 3 args:
   * filename
   * what you want the filename to download as
   * callback for the error
   *
   * download method is setting the headers for us
   * res.set('Content-Disposition', 'attachment')
   * res.sendFile(xxxx)
   *
   * res.attachment only sets the headers for content-disposition to attachment
   * IF, you provide a file, it will also set the filename
   * res.attachment(xxxx, 'FILENAME.XXX')
   */

  return res.download(
    path.resolve(__dirname, 'statements', 'statements.png'),
    `${date}-statement.png`,
    (err) => {
      // if there is an error in sending the file, headers may already be sent

      if (err) {
        // res.headers is a bool, true if headers are already sent
        if (!res.headersSent) {
          return res.redirect('/download/error')
        }
      }
    }
  )
})

app.listen(3000, () => console.log('SERVER RUNNING'))
