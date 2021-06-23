const dao = require('./dao.js')

exports.insereUsuario = async (conteudoBody) => {
    conteudoBody.email = conteudoBody.email.toLowerCase() 
    return await dao.incluiUsuario(conteudoBody)
}

exports.buscaUsuarios = async (nome, email) => {
  let retornoDao;
  if (nome || email) {
    retornoDao = await dao.listaUsuariosNomeEmail(nome, email)
  } else {
    retornoDao = await dao.listaUsuarios()
  }
  return retornoDao
}
