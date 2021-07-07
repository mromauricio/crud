const express = require('express')
const router = express.Router()
const service = require('./service')

router.get('/usuarios', async (req, res) => {
  const retornoService = await service.buscaUsuarios(req.query.nome, req.query.email, req.query.tel)
  if ( retornoService ) {
    res.send(JSON.stringify(retornoService))
  } else {
    res.status(500).send()
  }
})

router.post('/usuarios', async (req, res) => {
  if ( await service.insereUsuario(req.body) ) {
    res.status(201).send('Incluído com sucesso')
  }
  else {
    res.status(400).send()
  }
})

router.put('/usuarios/:codigo', async (req, res) => {
  if ( await service.alteraUsuario(req.body, req.params.codigo) ) {
    res.status(200).send()
  } else {
    res.status(500).send()
  }
})

router.delete('/usuarios/:codigo', async (req, res) => {
  if ( await service.apagaUsuario(req.params.codigo) ) {
    res.status(200).send()
  } else {
    res.status(500).send()
  }
})

module.exports = router