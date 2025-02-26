// this file generates a put link for the browser
// it is signed and validated based on params we set here

const aws = require('aws-sdk')

// configure aws module
const config = {
  accessKey: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  bucket: process.env.BUCKET,
  region: process.env.REGION,
}

aws.config.update(config)

function getS3SignedLink(
  uniqueS3Key,
  mimeType,
  bucket = config.bucket,
  region = config.region
) {
  return new Promise(async (resolve, reject) => {
    // this is where express/node talks to s3 and gets a link
    const options = {
      bucket,
      region,
      signatureExpires: 60, // num of seconds the link is valid for
      ACL: 'private',
      uniquePrefix: true,
    }

    // create an s3 object from the aws module
    const s3 = new aws.S3(options)

    const params = {
      Bucket: config.bucket,
      Key: uniqueS3Key,
      Expires: 60,
      ContentType: mimeType,
      ACL: 'private',
    }

    // s3.getSignedUrl receives: action, params, callback
    s3.getSignedUrl('putObject', params, (err, signedLink) => {
      if (err) throw new Error(err)

      resolve(signedLink)
    })
  })
}

module.exports = getS3SignedLink
