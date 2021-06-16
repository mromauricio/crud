const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
//const app = require('express').express()
const port = 3001


app.use(cors())
app.use(bodyParser.json())

const controller = require('./controller')
app.use('/', controller)

app.listen(port, () => {
  console.log(`Rodando aplicação no endereço http://localhost:${port}`)
}) 