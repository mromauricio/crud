const dao = require('./dao.js')

exports.insereUsuario = async (conteudoBody) => {
    conteudoBody.email = conteudoBody.email.toLowerCase() 
    return await dao.incluiUsuario(conteudoBody)
}

exports.buscaUsuarios = async (nome, email, tel) => {

    nome =  nome.includes('*') ?  nome.replace(/\*/g,'%') : `%${nome}%`
    // if ( nome.includes('*') ) {
    //     nome = nome.replace(/\*/g,'%') 
    // } else {
    //     nome = `%${nome}%`
    // }

    email =  email.includes('*') ?  email.replace(/\*/g,'%') : `%${email}%`
    tel =  tel.includes('*') ?  tel.replace(/\*/g,'%') : `%${tel}%`
    
 return await dao.listaUsuariosFiltro(nome, email, tel)
}


