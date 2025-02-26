const fs = require('fs')
const router = require('express').Router()
const multer = require('multer')

const upload = multer({ dest: 'public/images/uploads' })

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/upload', upload.single('meme'), (req, res) => {
  const oldPath = req.file.path
  const newPath = `public/images/uploads/${Date.now()}-${req.file.originalname}`

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err
    
    return res.json({
      msg: 'File uploaded',
    })
  })
})

module.exports = router
