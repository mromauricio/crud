let bancoDados = [];

// exports.incluiUsuario = (dados) => {
//   const tamanhoBancoDadosAntesPush = bancoDados.length
//   bancoDados.push(dados);
//   if ( bancoDados.length > tamanhoBancoDadosAntesPush) {
//     console.log('ESTOU NO DAO', bancoDados)
//     return true
//   } else {
//     return false
//   }
// }


exports.listaUsuarios = () => {
  return bancoDados
}

const { Pool } = require('pg')

const pool = new Pool({
  user: 'mauriciooliveira',
  host: 'localhost',
  database: 'mauriciooliveira',
  password: '',
  port: 5432
})

// pool
//   .query('SELECT * from usuario')
//   .then(res => console.log(res.rows))
//   .catch(e => console.error(e.stack))

exports.incluiUsuario = (dados) => {
  const text = 'INSERT INTO usuario (name, email, phone, password) VALUES($1, $2, $3, $4) RETURNING *'
  const values = [dados.nome, dados.email, dados.telefone, dados.senha]  
  pool
  .query(text, values)
  .then(res => {
    console.log(res.rows)
  })
  .catch(e => console.error(e.stack))  
}


