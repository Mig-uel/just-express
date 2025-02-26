const aws = require('aws-sdk')
require('dotenv').config()

// configure aws module
const config = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  bucket: process.env.BUCKET,
  region: process.env.REGION,
}

aws.config.update(config)

function getS3Link(key) {
  const s3 = new aws.S3({})
  const signedUrlExpire = 60 * 60

  const params = {
    Bucket: config.bucket,
    Key: key,
    Expires: signedUrlExpire,
  }

  const signedUrl = s3.getSignedUrl('getObject', params)

  return signedUrl
}

module.exports = getS3Link
