const dao = require('./dao.js')

exports.verificaBody =  (conteudoBody) => {
  if (isNaN(conteudoBody.telefone)){
    return false
  } else {
    if ( dao.incluiUsuario(conteudoBody) ) {
      return true
    } else {
      return false
    }
  }
}

exports.buscaUsuarios = () => {
  return dao.listaUsuarios()
}