var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  return res.json({ msg: 'index hit' })
})

module.exports = router
