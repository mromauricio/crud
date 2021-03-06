 const dao = require('./dao.js')  //? Exclusivo para PostgreSQL
//const dao = require('./daoMongodb.js') //? Exclusivo para MongoDB

exports.insereUsuario = async (conteudoBody) => {
    conteudoBody.email = conteudoBody.email.toLowerCase() 
    return await dao.incluiUsuario(conteudoBody)
}

exports.alteraUsuario = async (conteudoBody, id) => {
    conteudoBody.email = conteudoBody.email.toLowerCase() 
    return await dao.alteraUsuario(conteudoBody, id)
}

exports.apagaUsuario = async (idUsuario) => {
    return await dao.apagaUsuario(idUsuario)
}

exports.buscaUsuarios = async (nome, email, tel) => {
    nome =  nome.includes('*') ?  nome.replace(/\*/g,'%') : `%${nome}%`
    email =  email.includes('*') ?  email.replace(/\*/g,'%') : `%${email}%`
    tel =  tel.includes('*') ?  tel.replace(/\*/g,'%') : `%${tel}%`
    return await dao.listaUsuariosFiltro(nome, email, tel)
}

//? Exclusivo para MongoDB
// exports.buscaUsuarios = async (nome, email, tel) => {
//    return await dao.listaUsuariosFiltro(nome, email, tel)
//}



