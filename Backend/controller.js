const express = require('express')
const router = express.Router()
const service = require('./service')

router.get('/', async (req, res) => {
  const retornoService = await service.buscaUsuarios()
  if ( retornoService ) {
    res.send(JSON.stringify(retornoService))
  } else {
    res.status(500).send()
  }
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