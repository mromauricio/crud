//? MONGODB ATLAS - CLOUD NOSQL 
require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.mongoDbUri

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('connected', function() {console.log("Successful connection on MongoDB")})
const usuarios = db.collection('usuarios')
const Schema = mongoose.Schema;

const Usuario = mongoose.model('Usuario', Schema({
  name:  {type:  String, required: true, maxlength: 240},
  phone: {type:  String, required: true, maxlength: 30},
  email: {type:  String, required: true, maxlength: 100, unique: true},
  password: {type:  String, required: true, maxlength: 30},
}));

exports.incluiUsuario = async (dados) => {
  const usuario = new Usuario({name: dados.nome, phone: dados.telefone, email: dados.email, password: dados.senha});
  try {
    await usuario.save()
    return true
  }
  catch (error) {
    console.log(error)
    return false
  } 
}

usuarios.createIndex( { name: "text" } )

//! Lembrar de tirar replace do SERVICE
exports.listaUsuariosFiltro = async (nome, email, tel) => {
  let queryName
  if (nome) {
    queryName = { $text: {$search: `.*${nome}.*`, $caseSensitive: false, $diacriticSensitive: false }} // tem que preencher a palavra completa. Não traz quando vazio
  } else {
    queryName = {name: {$regex: `.*${(nome)}.*` , $options: 'i'} }  // para trazer todos os nomes
  }
  let resultado = [];
  try{
    await usuarios.find( { $and:[
      queryName,      
      {email: {$regex: email, $options: 'i'} },
      {phone: {$regex: tel, $options: 'i'} }
    ]})
      .forEach(row => resultado.push(row))
  }
  catch (error) {
    console.log(error)
  }
  finally {
    return resultado
  }
}

exports.alteraUsuario = async (dados, idUsuario) => {
  try {
    const filter = { _id: new mongoose.Types.ObjectId(idUsuario) };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        name: dados.nome,
        phone: dados.telefone, 
        email: dados.email,
        password: dados.senha
      },
    };
    const result = await usuarios.updateOne(filter, updateDoc, options);
    if (result.modifiedCount === 1) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.apagaUsuario = async (idUsuario) => {
  try {
    const filter = { _id: new mongoose.Types.ObjectId(idUsuario) };
    const result = await usuarios.deleteOne(filter);
    console.log(result)
    if (result.deletedCount === 1) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
