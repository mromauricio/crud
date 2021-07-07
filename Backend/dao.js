require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.pg_user,
  host: process.env.pg_host,
  database: process.env.pg_database,
  password: process.env.pg_password,
  port: process.env.pg_port
})

const verifyConnection = async () => {
  try{
    client = await pool.connect()
    console.log('Successful connection on PostgreSQL')
    client.release()
  }
  catch (error) {
    console.log(error)
  }
}

verifyConnection()

exports.incluiUsuario = async (dados) => {
  const client = await pool.connect()
  const command = 'INSERT INTO usuario (name, email, phone, password) VALUES($1, $2, $3, $4) RETURNING *'
  const values = [dados.nome, dados.email, dados.telefone, dados.senha]  
  try {
    const resultado = await client.query(command, values)
    if (resultado.rows.length > 0) {
      return true
    } else return false
  }
  catch (error) {
    console.log (error)
    return false
  }
  finally {
    client.release()
  }
}


exports.alteraUsuario = async (dados, idUsuario) => {
  const client = await pool.connect()
  const command = 'UPDATE usuario SET name = $1, email = $2, phone = $3, password = $4 WHERE id = $5'
  const values = [dados.nome, dados.email, dados.telefone, dados.senha, idUsuario]  
  try {
    const resultado = await client.query(command, values)
    if (resultado.rowCount === 1) {
      return true
    } else return false
  }
  catch (error) {
    console.log (error)
    return false
  }
  finally {
    client.release()
  }
}

exports.apagaUsuario = async (idUsuario) => {
  const client = await pool.connect()
  const command = 'DELETE FROM usuario WHERE id=$1'
  const values = [idUsuario]  
  try {
    const resultado = await client.query(command, values)
    if (resultado.rowCount === 1) {
      return true
    } else return false
  }
  catch (error) {
    console.log (error)
    return false
  }
  finally {
    client.release()
  }
}

function minusculoSemAcento (texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

exports.listaUsuariosFiltro = async (nome, email, tel) => {
  const client = await pool.connect()
  const command = 'SELECT * FROM usuario WHERE lower(unaccent(name)) LIKE $1 AND lower(unaccent(email)) LIKE $2 AND phone LIKE $3  ORDER BY LOWER(name) ASC'
  const values = [`${minusculoSemAcento(nome)}`, `${minusculoSemAcento(email)}`, `${tel}`]
  try {
    let resultado = await client.query(command, values)
    return resultado.rows
  }
  catch (error) {
    console.log (error)
    return false
  }
  finally {
    client.release()
  }
}
