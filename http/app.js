const http = require('http')

// the http module has a createServer method
// the createServer method takes in 1 argument, a callback function
// the callback function takes 2 arguments: request and response
const server = http.createServer((req, res) => {
  // the req argument contains data about the client
  // the res argument is the response we send back

  console.log(req)
})

// createServer method returns an object with a listen method that takes in 1 argument:
// port to listen for http traffic
server.listen(3000)
