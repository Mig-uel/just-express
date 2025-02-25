const router = require('express').Router()
const movieDetails = require('../data/movieDetails')

router.get('/:id', function (req, res) {
  const { id } = req.params
  if (isNaN(id)) return res.status(500).json({ msg: 'Provided ID is invalid!' })

  const results = movieDetails.find((movie) => movie.id == id)

  if (!results)
    return res
      .status(404)
      .json({ msg: 'Movie not found', results: results ?? [] })

  return res.json({ results })
})

module.exports = router
