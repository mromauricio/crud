//? MONGODB ATLAS - CLOUD NOSQL 
require('dotenv').config()
const mongoose = require('mongoose');
const uri = process.env.mongoDbUri

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {console.log("Successful connection on MongoDB");});
const usuarios = db.collection('usuarios')
const Schema = mongoose.Schema;

const Usuario = mongoose.model('Usuario', Schema({
  name:  {type:  String, required: true, maxlength: 240},
  phone: {type:  String, required: true, maxlength: 30},
  email: {type:  String, required: true, maxlength: 100, unique: true},
  password: {type:  String, required: true, maxlength: 30},
}));

exports.incluiUsuario = async (dados) => {
  mongoose.connection
  const usuario = new Usuario({name: dados.nome, phone: dados.telefone, email: dados.email, password: dados.senha});
  try {
    await usuario.save()
    return true
  }
  catch (error) {
    console.log(error)
    return false
  } finally {
    mongoose.connection.close()
  }
}


function diacriticSensitiveRegex(string = '') {
  return string.replace(/a/g, '[ã,á,à,ä]')
     .replace(/e/g, '[e,é,ë]')
     .replace(/i/g, '[i,í,ï]')
     .replace(/o/g, '[o,ó,ö,ò]')
     .replace(/u/g, '[u,ü,ú,ù]');
}

usuarios.createIndex( { name: "text" } )

//! Lembrar de tirar replace do SERVICE
//! Busca com acento somente traz com acento
//'.*star wars.*'
exports.listaUsuariosFiltro = async (nome, email, tel) => {
  let queryName
  if (nome) {
    queryName = { $text: {$search: `.*${nome}.*`, $caseSensitive: false, $diacriticSensitive: false }} // tem que preencher a palavra completa. Não traz quando vazio
  } else {
    queryName = {name: {$regex: `.*${(nome)}.*` , $options: 'i'} }  // busca em qq parte. Se preencher com acento, busca somente com acento 
  }
  let resultado = [];
  try{
    await usuarios.find( { $and:[
      // { name: new RegExp(`^${nome}$`, 'i') },
      // { name: { $regex: new RegExp(`^${nome}$`, 'i') } };
      // { name: { $regex: new RegExp(`^${nome}$`), $options: 'i' } },
      queryName,      
      {email: {$regex: email, $options: 'i'} },
      {phone: {$regex: tel, $options: 'i'} }
    ]})
    //  .collation( { locale: 'pt', strength: 1 } )
    //! Falta tratar acentuação
    // { $or:[
    //   {name: {$regex: nome, $options: 'i'} },
    //   {name: query.normalize('NFD').replace(/[\u0300-\u036f]/g, "") }
    //   ]}
      .forEach(row => resultado.push(row))
  }
  catch (error) {
    console.log(error)
  }
  finally {
    return resultado
  }
}
