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

  console.log(fileData)

  const postUrl = `http://localhost:3000/get-signed-url`
  const postRes = await fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(fileData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await postRes.json()
  console.log(data)
}

document.getElementById('file-form').addEventListener('submit', addFile)
