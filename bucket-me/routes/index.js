const router = require('express').Router()
const mime = require('mime-types')
const getS3Link = require('../helpers/getS3Link')
const getS3SignedLink = require('../helpers/getS3SignedURL')

/**
 * Purpose of this route:
 *
 * 1. can the user upload this file?
 * 2. if so, ask aws for a signed url that can upload
 * 3. send that link back and provide feedback to the user
 */
router.post('/get-signed-url', async (req, res) => {
  const { fileName, fileSize, fileType } = req.body

  // encodeURIComponent - makes the name url safe, for instance, " " becomes %20
  const uniqueFileName = `${Date.now()}-${encodeURIComponent(fileName)}`

  // make sure you have the right mime type
  const mimeType = mime.lookup(fileName)

  // call getS3PutLink and send it our uniqueFileName
  const signedLink = await getS3SignedLink(uniqueFileName, mimeType)

  console.log(signedLink)

  return res.json({
    signedLink,
    mimeType,
    uniqueFileName,
  })
})

router.post('/finalize-upload', (req, res) => {
  const { key } = req.body

  // do all the stuff in here that needs to happen once express
  // knows that the upload was successful

  const signedLink = getS3Link(key)

  return res.json({ signedLink })
})

module.exports = router
