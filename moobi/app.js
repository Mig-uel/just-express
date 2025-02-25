const helmet = require('helmet')
const express = require('express')

const app = express()
const BASE_URL = 'https://api.themoviedb.org/3/find/4?external_source=imdb_id'
const API_KEY = '0fe019cac089261188ecf06fc8aa1bfe'

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async (req, res) => {
  return res.render('index')
})

app.listen(3000, () => console.log('SERVER STARTED'))
