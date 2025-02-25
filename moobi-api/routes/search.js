const router = require('express').Router()
const movies = require('../data/movies')
const people = require('../data/people')

router.use((req, res, next) => {
  const { search } = req.query

  if (!search)
    return res.status(400).json({ msg: 'Search and/or type params required' })

  return next()
})

router.get('/movie', function (req, res) {
  const { search } = req.query

  const results = movies.filter((movie) => {
    const found =
      movie.overview.toLowerCase().includes(search.toLowerCase()) ||
      movie.title.toLowerCase().includes(search.toLowerCase())

    return found
  })

  return res.json({ results })
})

router.get('/person', function (req, res) {
  const { search } = req.query

  const results = people.filter((person) => {
    const found = person.name.toLowerCase().includes(search.toLowerCase())
    
    return found
  })

  return res.json({ results })
})

module.exports = router
