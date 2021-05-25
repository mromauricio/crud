let bancoDados = [];

exports.incluiUsuario = (dados) => {
  const tamanhoBancoDadosAntesPush = bancoDados.length
  bancoDados.push(dados);
  if ( bancoDados.length > tamanhoBancoDadosAntesPush) {
    console.log('ESTOU NO DAO', bancoDados)
    return true
  } else {
    return false
  }
}


exports.listaUsuarios = () => {
  return bancoDados
}