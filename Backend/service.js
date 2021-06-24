const dao = require('./dao.js')

exports.insereUsuario = async (conteudoBody) => {
    conteudoBody.email = conteudoBody.email.toLowerCase() 
    return await dao.incluiUsuario(conteudoBody)
}

exports.buscaUsuarios = async (nome, email, tel) => {
 return await dao.listaUsuariosFiltro(nome, email, tel)
}
