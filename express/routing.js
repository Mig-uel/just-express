const express = require('express')

const app = express()

/**
 * app object has a few methods:
 *
 * http/rest/crud verbs
 * 1. get - read
 * 2. post - create
 * 3. delete - delete
 * 4. put - update
 *
 * 0. all - accept any method
 *
 * all of these take 2 args: path and a callback
 *
 * express works from the top-down
 */
app.get('/', (req, res) => {
  res.send('Welcome to the home GET page!')
})
app.post('/', (req, res) => {
  res.send('Welcome to the home POST page!')
})
app.delete('/', (req, res) => {
  res.send('Welcome to the home DELETE page!')
})

app.put('/', (req, res) => {
  res.send('Welcome to the home PUT page!')
})

app.listen(3000, () => console.log('SERVER RUNNING'))
