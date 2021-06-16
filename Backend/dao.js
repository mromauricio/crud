const { Pool } = require('pg')

const pool = new Pool({
  user: 'mauriciooliveira',
  host: 'localhost',
  database: 'mauriciooliveira',
  password: '',
  port: 5432
})

exports.incluiUsuario = (dados) => {
  const text = 'INSERT INTO usuario (name, email, phone, password) VALUES($1, $2, $3, $4) RETURNING *'
  const values = [dados.nome, dados.email, dados.telefone, dados.senha]  
  pool
    .query(text, values)
    .then(res => {
      return true
    })
    .catch(e => {
      console.error(e.stack)
      return false
    })
    .finally(() => {
      pool.end()
      console.log('FECHEI CONEXÃO COM BD')
    })  
}

exports.listaUsuarios = async () => {
  const select = 'SELECT * FROM usuario ORDER BY id ASC'
  const dados = await pool.query({
    text: select
  })
  return dados.rows
}


