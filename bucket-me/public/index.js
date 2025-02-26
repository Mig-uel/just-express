const updateProgressBar = (e) => {
  console.log(e)
  const progressDone = e.progress
  const barWidth = Math.floor(progressDone * 100)
  const barStyle = `${barWidth}%`
  document.querySelector('.progress-bar').style.width = barStyle
  document
    .querySelector('.progress-bar')
    .setAttribute('aria-valuenow', barWidth)
}

async function addFile(e) {
  e.preventDefault()

  const file = e.target[0].files[0]

  if (!file) return

  // 1. get link from express so we can upload our file
  const fileData = {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  }

  const postUrl = `http://localhost:3000/get-signed-url`
  const postRes = await fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(fileData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await postRes.json()

  // 2. turn on progress bar
  if (!data.signedLink) {
    swal({ title: 'Server rejected the link', icon: 'error' })
    return
  }

  // we have a link
  document.getElementById('progress-wrapper').style.display = 'block'

  // 3. try and upload the file to s3
  const awsFinalRes = await new Promise(async (resolve, reject) => {
    try {
      const config = {}

      // content-type much match what express told s3
      config.headers = {
        'content-type': data.mimeType,
      }

      config.onUploadProgress = (e) => updateProgressBar(e)

      // aws is expecting a PUT method
      const awsRes = await fetch(data.signedLink, {
        method: 'PUT',
        ...config,
        body: file,
      })

      if (!awsRes.ok) throw new Error('Something went wrong...')

      resolve(awsRes)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })

  // 4. aws did not err, so let express know what happened
  const finalUrlToExpress = `http://localhost:3000/finalize-upload`
  const finalData = {
    key: data.uniqueFileName,
  }

  const finalRes = await fetch(finalUrlToExpress, {
    method: 'POST',
    body: JSON.stringify(finalData),
    headers: {
      'content-type': 'application/json',
    },
  })

  const imageLink = await finalRes.json()

  document.getElementById(
    'current-image'
  ).innerHTML = `<img src="${imageLink.signedLink}" width="100%" />`
}

document.getElementById('file-form').addEventListener('submit', addFile)
