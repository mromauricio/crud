const dao = require('./dao.js')

exports.verificaBody = async (conteudoBody) => {
  if (isNaN(conteudoBody.telefone)){
    return false
  } else {
    if ( await dao.incluiUsuario(conteudoBody) ) {
      return true
    } else {
      return false
    }
  }
}

exports.buscaUsuarios = async () => {
  let retornoDao = [];
  retornoDao = await dao.listaUsuarios()
  return retornoDao
}


