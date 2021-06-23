import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const { json } = bodyParser
const app = express()
const port = 3001


app.use(cors())
app.use(json())

import controller from './controller.js'
app.use('/', controller)

app.listen(port, () => {
  console.log(`Rodando aplicação no endereço http://localhost:${port}`)
}) 