const path = require('path')
/**
 * express is whatever was exported by the express module
 */
const express = require('express')

/**
 * app is the express function invoked
 */
const app = express()

/**
 * serve up static files
 */
app.use(express.static('public'))

/**
 * all() method takes two args:
 * 1. route
 * 2. callback to run if the route is requested
 */
app.all('/', (req, res) => {
  /**
   * express handles the basic headers (status code, mime-type)
   */
  res.sendFile(path.resolve(__dirname, 'index.html'))

  /**
   * express handles the end, no need for res.end()
   */
})

app.all('*', (req, res) => {
  res.send('<h1>Sorry, this page does not exist!</h1>')
})

app.listen(3000, () => console.log('SERVER LISTENING ON PORT 3000'))
