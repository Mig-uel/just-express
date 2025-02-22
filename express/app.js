/**
 * express is whatever was exported by the express module
 */
const express = require('express')

/**
 * app is the express function invoked
 */
const app = express()

/**
 * all() method takes two args:
 * 1. route
 * 2. callback to run if the route is requested
 */
app.all('*', (req, res) => {
  /**
   * express handles the basic headers (status code, mime-type)
   */
  res.send(`<h1>This is the homepage</h1>`)

  /**
   * express handles the end, no need for res.end()
   */
})

app.listen(3000, () => console.log('SERVER LISTENING ON PORT 3000'))
