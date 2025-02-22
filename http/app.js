/**
 * http module is native to Node
 */
const http = require('http')

/**
 * the http module has a createServer method
 * createServer takes in 1 argument: callback function
 * the callback function takes 2 arguments: request and response
 *
 * the req argument contains data about the client
 * the res argument is the response we send back
 *
 * the http message has:
 * 1. start-line (we don't have to deal with, node will) - CHECK
 * 2. header (we will deal with it)
 * 3. body - (we write the body)
 */
const server = http.createServer((req, res) => {
  /**
   * writeHead(): takes 2 args, status code and the object for the mime-type
   */
  res.writeHead(200, { 'content-type': 'text/html' })
  res.write('<h1>This is the home page</h1>')
  res.end()
})

/**
 * createServer method returns an object with a listen method that takes in 1 argument:
 * port to listen for http traffic
 */
server.listen(3000, () => console.log('SERVER RUNNING'))
