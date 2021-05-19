const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
//const app = require('express').express()
const port = 3001


app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('SOU O BACKEND')
} )

app.post('/', (req, res) => {
  console.log('REQ BODY RECEBIDO', req.body)
  if (req.body) {
    res.status(201).send('Recebido com sucesso')
  }
  else {
    res.status(400)
  }
} )


app.listen(port, () => {
  console.log(`Rodando aplicação no endereço http://localhost:${port}`)
})