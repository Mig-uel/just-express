const helmet = require('helmet')
const express = require('express')
require('express-async-errors')

const app = express()
const BASE_URL = 'https://api.themoviedb.org/3'
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing?language=en-US`
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmUwMTljYWMwODkyNjExODhlY2YwNmZjOGFhMWJmZSIsIm5iZiI6MTcxNzYyNjE4Ny41Mywic3ViIjoiNjY2MGU1NGJlNDM1MzYzNDc5NGY2ODIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.66i5lEGCn9d9TwdKYSeWt1qUNsgNO_kLgZaaTu-vOXk'

app.set('view engine', 'ejs')
app.set('views', 'views')

// app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use((req, res, next) => {
  res.locals.imageBase = IMAGE_BASE_URL
  return next()
})

app.get('/movie/:id', async (req, res) => {
  const { id } = req.params

  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  const data = await response.json()

  return res.render('single-movie', {
    movie: data,
  })
})

app.get('/', async (req, res) => {
  const response = await fetch(NOW_PLAYING_URL, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  const data = await response.json()

  return res.render('index', {
    movies: data.results,
  })
})

app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(403)
    res.json({ error: err.message })
  }

  return next(err)
})

app.listen(3000, () => console.log('SERVER STARTED'))
