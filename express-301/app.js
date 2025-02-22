const path = require('path')
const helmet = require('helmet')
const express = require('express')

const app = express()

/** middlewares */
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.get('/about', (req, res) => {
  return res.render('about')
})

app.get('/', (req, res) => {
  res.send('sanity check')
})

app.listen(3000, () => console.log('SERVER RUNNING'))
