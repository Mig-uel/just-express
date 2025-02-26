const express = require('express')
const indexRouter = require('./routes')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

app.use(indexRouter)

app.listen(port, () => console.log(`-- SERVER RUNNING: ${port} --`))
