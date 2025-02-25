const router = require('express').Router()
const movieDetails = require('../data/movieDetails')

function requireJSON(req, res, next) {
  if (!req.is('application/json'))
    return res.status(400).json({ msg: 'Invalid Content-Type' })

  return next()
}

router.param('id', (req, res, next, id) => {
  // update the db with analytics data
  // if (req.method === 'GET') console.log('MOVIE ID ROUTE HIT:' + id)

  // check id to see if its not a number
  if (isNaN(id))
    return res.status(400).json({ msg: 'Provided movie ID is invalid!' })

  return next()
})

router.get('/top_rated', (req, res) => {
  const { page = 1 } = req.query
  const limit = 20
  const start = (page - 1) * limit
  const end = start + 19

  const total = movieDetails.length
  const pages = Math.ceil(total / limit)
  const results = movieDetails
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(start, end)

  return res.json({ page, pages, total, results })
})

router.get('/:id', function (req, res) {
  const { id } = req.params

  const results = movieDetails.find((movie) => movie.id == id)

  if (!results)
    return res
      .status(404)
      .json({ msg: 'Movie not found', results: results ?? [] })

  return res.json({ results })
})

router.post('/:id/rating', requireJSON, (req, res) => {
  const { id } = req.params
  const { user_rating } = req.body

  if (isNaN(user_rating)) return res.status(400).json({ msg: 'Invalid rating' })

  if (user_rating < 0.5 || user_rating > 10)
    return res.status(400).json({ msg: 'Rating must be between .5 and 10' })

  return res
    .status(201)
    .json({ id, msg: 'Thank you for submitting your rating.' })
})

router.delete('/:id/rating', requireJSON, (req, res) => {
  const { id } = req.params

  return res.status(200).json({ id, msg: 'Rating deleted' })
})

module.exports = router
