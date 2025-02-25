var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.set('Date', new Date(1969, 6, 20))
  // res.set('Cache-Control', 'no-store')
  // res.set('Content-Type', 'text/html')

  /**
   * fresh and stale
   *
   * req.fresh returns true if it's not stale
   * req.stale returns true if it is stale
   */
  console.log(req.fresh)
  console.log(req.stale)

  return res.render('index', { title: 'Express' })
})

module.exports = router
