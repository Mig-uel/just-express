const router = require('express').Router()

const movies = require('../data/movies')

router.get('/', function (req, res) {
  return res.json(movies)
})

router.get('/most_popular', (req, res) => {
  const { page = 1 } = req.query
  const limit = 20
  const start = (page - 1) * limit
  const end = start + 19

  const results = movies.filter((movie) => movie.most_popular).slice(start, end)
  const total = results.length

  return res.json({
    page,
    total,
    results,
  })
})

module.exports = router
