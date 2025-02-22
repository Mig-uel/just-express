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
  return res.render('login')
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

app.listen(3000, () => console.log('SERVER RUNNING'))
