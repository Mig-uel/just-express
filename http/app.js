/**
 * fs, http module is native to Node
 *
 * fs gives node access to THIS computers file system
 */
const fs = require('fs/promises')
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
const server = http.createServer(async (req, res) => {
  const url = req.url

  /**
   * if the user wants the homepage (req.url is '/')
   */
  if (url === '/') {
    /**
     * writeHead(): takes 2 args, status code and the object for the mime-type
     */
    res.writeHead(200, { 'content-type': 'text/html' })

    const homePageHTML = await fs.readFile('index.html')
    res.write(homePageHTML)
    res.end()
  } else if (url === '/node.png') {
    res.writeHead(200, { 'content-type': 'image/png' })

    const image = await fs.readFile('node.png')
    res.write(image)
    res.end()
  } else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' })

    const css = await fs.readFile('styles.css')
    res.write(css)
    res.end()
  } else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write("<h4>Sorry, this isn't the page you're looking for!</h4>")
    res.end()
  }
})

/**
 * createServer method returns an object with a listen method that takes in 1 argument:
 * port to listen for http traffic
 */
server.listen(3000, () => console.log('SERVER RUNNING'))
