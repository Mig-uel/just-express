/**
 * Router() creates a new router object
 *
 */
const router = require('express').Router()

router.get('/', (req, res) => {
  return res.json({ msg: 'router works' })
})

module.exports = router
