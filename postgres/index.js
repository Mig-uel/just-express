const express = require('express')
const { Pool } = require('pg')

const app = express()
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'postadmin',
})

app.get('/', (req, res) => {
  const data = 35
  const query = 'SELECT * FROM city_weathers WHERE id > $1'

  pool.query(query, [data], (error, result) => {
    return res.json(result)
  })

  pool.end()
})

app.listen(3000, () => console.log('-- SERVER RUNNING --'))
