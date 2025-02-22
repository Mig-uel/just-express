const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())

app.use(express.static('public'))

/**
 * express.json() is a built-in middleware function that parses incoming requests containing JSON payloads
 * the mime-type of the body is application/json and only parses it when the mime-type is that of
 */
app.use(express.json())

/**
 * express.urlencoded() is a build-in middleware function that parses incoming requests containing urlencoded payloads
 * the mime-type of the body is application/x-www-form-urlencoded and only parses it when the mime-type is that of
 */
app.use(express.urlencoded({ extended: false }))

app.post('/ajax', (req, res) => {
  console.log(req)

  res.send('TEST')
})

app.listen(3000, () => console.log('SERVER RUNNING'))
