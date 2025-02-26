const router = require('express').Router()
const mime = require('mime-types')

/**
 * Purpose of this route:
 *
 * 1. can the user upload this file?
 * 2. if so, ask aws for a signed url that can upload
 * 3. send that link back and provide feedback to the user
 */
router.post('/get-signed-url', (req, res) => {
  const { fileName, fileSize, fileType } = req.body

  // encodeURIComponent - makes the name url safe, for instance, " " becomes %20
  const uniqueFileName = `${Date.now()}-${encodeURIComponent(fileName)}`

  // make sure you have the right mime type
  const mimeType = mime.lookup(fileName)

  // call getS3PutLink and send it our uniqueFileName
  return res.json(req.body)
})

module.exports = router
