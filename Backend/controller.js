const express = require('express')
const router = express.Router()
const service = require('./service')

router.get('/', (req, res) => {
  res.send(JSON.stringify(service.buscaUsuarios()))
} )

router.post('/', (req, res) => {
  if ( service.verificaBody(req.body) ) {
    res.status(201).send('Incluído com sucesso')
  }
  else {
    res.status(400).send()
  }
})

module.exports = router