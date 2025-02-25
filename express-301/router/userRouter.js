const userRouter = require('express').Router()

function validateMainRoute(req, res, next) {
  const date = new Date().toISOString()

  console.log(req.method, req.path, date)

  return next()
}

/**
 * router.use works the same way that app.use does,
 * but it is specific to THIS router
 */
userRouter.use(validateMainRoute)

userRouter.get('/', (req, res) => {
  return res.json({ msg: 'user router works' })
})

module.exports = userRouter
