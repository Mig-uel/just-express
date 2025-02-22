const express = require('express')

const app = express()

/**
 * express is two things:
 * 1. router
 * 2. series of middleware
 *
 * middleware:
 * req ---- middleware ----> Res
 *
 * a middleware function is ANY function that has access to the req, res, next objects
 * 1. request comes in
 * 2. we need to validate the user, sometimes
 * 3. we need to store some things in the db
 * 4. if there is data from the user, we need to parse it and store it
 * 5. send response
 */
function validateUser(req, res, next) {
  /**
   * get info out of the req object
   */
  /**
   * perform db operations
   */
  /**
   * res.locals:
   * - property attached to every response, live for the life of the response, useful for passing data to a template
   * - useful for exposing request-level information such as the request path name, authenticated user, user settings, and more
   */
  res.locals.validated = true
  console.log('validateUser() RAN')
  return next()
}

/**
 * use middleware function
 */
app.use('/admin', validateUser)

app.get('/', (req, res, next) => {
  console.log(res.locals.validated)
  return res.send('Main Page')
})

app.get('/admin', (req, res, next) => {
  console.log(res.locals.validated)
  return res.send('ADMIN Page')
})

app.listen(3000, () => console.log('SERVER RUNNING'))
