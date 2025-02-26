function updateProgressBar(e) {
  console.log(e)
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
    const awsData = await awsRes.json()
    console.log(awsData)
  } catch (error) {
    console.log(error)
  }
}

document.getElementById('file-form').addEventListener('submit', addFile)
