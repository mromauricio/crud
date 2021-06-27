//? MONGODB ATLAS - CLOUD NOSQL 

const mongoose = require('mongoose');
const uri = "mongodb+srv://mromauricioDB:PWDmromauricioDB@cluster0.hufxi.gcp.mongodb.net/crud?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {console.log("Successful connection on MongoDB");});
const usuarios = db.collection('usuarios')
const Schema = mongoose.Schema;

const Usuario = mongoose.model('Usuario', Schema({
  name:  {type:  String, required: true, maxlength: 240},
  phone: {type:  String, required: true, maxlength: 30},
  email: {type:  String, required: true, maxlength: 100},
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
  let resultado = [];
  try{
    await usuarios.find( { $and:[
      { $text: {$search: nome, $caseSensitive: false, $diacriticSensitive: false }}, // tem que preencher a palavra completa. Não traz quando vazio
      // {name: {$regex: diacriticSensitiveRegex(nome), $options: 'i'} },   // sem preencher sem acento, busca com e sem acento, mas não em qq parte. Se preencher com acento, busca somente com acento 
      // {name: {$regex: `.*${nome}.*` , $options: 'i'} },  // busca em qq parte  mas distingue acento
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
