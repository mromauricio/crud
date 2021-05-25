const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
//const app = require('express').express()
const port = 3001


app.use(cors())
app.use(bodyParser.json())

// app.post('/', (req, res) => {
//   console.log('REQ BODY RECEBIDO', req.body)
//   if (Object.keys(req.body).length !== 0) {
//     res.status(201).send('Recebido com sucesso')
//   }
//   else {
//     res.status(400).send()
//   }
// })

const controller = require('./controller')
app.use('/', controller)

// const controller-prod = require('./controller-prod')
// app.use('/produtos', controller-prod)

app.listen(port, () => {
  console.log(`Rodando aplicação no endereço http://localhost:${port}`)
}) 