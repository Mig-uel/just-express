const helmet = require('helmet')
const express = require('express')
const router = require('./router')
const userRouter = require('./router/userRouter')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

// Router
app.use(router)
app.use('/user', userRouter)

app.listen(3000, () => {
  console.log('__ SERVER RUNNING __')
})
