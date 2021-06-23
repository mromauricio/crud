const { Pool } = require('pg')

const pool = new Pool({
  user: 'mauriciooliveira',
  host: 'localhost',
  database: 'mauriciooliveira',
  password: '',
  port: 5432
})

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

exports.listaUsuarios = async () => {
  const client = await pool.connect()
  const command = 'SELECT * FROM usuario ORDER BY LOWER(name) ASC'
  try {
    const resultado = await client.query(command)
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

exports.listaUsuariosNomeEmail = async (nome, email) => {
  const client = await pool.connect()
  const command = 'SELECT * FROM usuario WHERE lower(name) LIKE $1 ORDER BY LOWER(name) ASC'
  const values = [`${nome.toLowerCase()}%`]
  try {
    const resultado = await client.query(command, values)
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



