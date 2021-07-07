toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$(document).ready(function () { 
  $('#telefone').mask('(00) 00000-0000', {reverse: false});
});

let idUsuario = 0;

const btnIncluir = document.querySelector("#botao")
btnIncluir.addEventListener('click', () => verificaTudoAntesDeEnviar())

const btnListar = document.querySelector("#listar")
btnListar.addEventListener('click', () => listaUsuariosCadastrados(inputNome.value, inputEmail.value, inputTelefone.value, false))

const btnAlterar = document.querySelector("#alterar")
btnAlterar.addEventListener('click', () => alteraUsuarioCadastrado(inputNome.value, inputEmail.value, inputTelefone.value, inputSenha.value))

const btnApagar = document.querySelector("#apagar")
btnApagar.addEventListener('click', () => apagaUsuarioCadastrado(idUsuario))


const inputEmail = document.querySelector("#email")
const labelEmail = document.querySelector("#label-email")
inputEmail.addEventListener('blur', () => {
          validaFormulario('email') 
          listaUsuariosCadastrados('',inputEmail.value,'', true)
        })

const inputNome = document.querySelector("#nome")
const labelNome = document.querySelector("#label-nome")
inputNome.addEventListener('blur', () => validaFormulario('nome') )

const inputTelefone = document.querySelector("#telefone")
const labelTelefone = document.querySelector("#label-telefone")
inputTelefone.addEventListener('blur', () => validaFormulario('telefone') )

const inputSenha = document.querySelector("#senha")
const labelSenha = document.querySelector("#label-senha")
inputSenha.addEventListener('blur', () => validaFormulario('senha') )

function limpaFormulario(){
  inputNome.value = ''
  inputTelefone.value = ''
  inputEmail.value = ''
  inputSenha.value = ''
}

limpaFormulario()

let existeErroNome, existeErroTelefone, existeErroEmail, existeErroSenha = true

function validaFormulario (campo) {
  if (campo === 'nome') {
    if (inputNome.value.trim().length == 0 ) {
      labelNome.setAttribute('style', 'color: red')
      existeErroNome = true
    } else {
      labelNome.removeAttribute('style')
      existeErroNome = false
    }
  }

  if (campo === 'telefone') {
    if (inputTelefone.value.trim().length == 0 ) {
      labelTelefone.setAttribute('style', 'color: red')
      existeErroTelefone = true
    } else {
      labelTelefone.removeAttribute('style')
      existeErroTelefone = false
    }
  }

  if (campo === 'email') {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.value) 
    || inputEmail.value.trim().length == 0)
    {
      labelEmail.setAttribute('style', 'color: red')
      existeErroEmail = true
    } else {
      labelEmail.removeAttribute('style')
      existeErroEmail = false
    }
  }
  if (campo === 'senha') {
    if (inputSenha.value.length <= 7){
      labelSenha.setAttribute('style', 'color: red')
      existeErroSenha = true
    } else {
      labelSenha.removeAttribute('style')
      existeErroSenha = false
    }
  }
  verificarBotãoIncluir()
}

function verificarBotãoIncluir() {
  if (existeErroNome || existeErroTelefone ||
    existeErroEmail || existeErroSenha)  {
      btnIncluir.setAttribute('class', 'btn btn-outline-secondary')
      btnIncluir.setAttribute('disabled', '')
    } else {
      btnIncluir.removeAttribute('disabled')
      btnIncluir.setAttribute('class', 'btn btn-outline-primary')
    } 
}

function verificaTudoAntesDeEnviar() {
  validaFormulario('nome')
  validaFormulario('telefone')
  validaFormulario('email')
  validaFormulario('senha')
  if (existeErroNome || existeErroTelefone ||
   existeErroEmail || existeErroSenha)  {
    toastr["error"](`Corrija os campos em vermelho!`)
  } else {
    enviarDados()
  }
}

function enviarDados() {
  const usuarioPayload = {
    "nome": inputNome.value,
    "telefone": inputTelefone.value,
    "email": inputEmail.value,
    "senha": inputSenha.value
  }
  axios.post('http://localhost:3001/usuarios', usuarioPayload)
    .then(response => {
    console.log(response.data)
    if (response.status === 201) {
      toastr["success"]("Dados salvos com sucesso!")
      limpaFormulario()
    } else {
      toastr["error"]("Ooops! Algo deu errado!")
    }
  }).catch((error) => {
    toastr["error"]("Ooops! Algo deu errado!")
  }) 
}

// function enviarDados() {
//   const usuarioPayload = {
//     "nome": inputNome.value,
//     "telefone": inputTelefone.value,
//     "email": inputEmail.value,
//     "senha": inputSenha.value
//   }
//   fetch('http://localhost:3001/usuarios', 
//     {
//       method: 'POST',
//       body: JSON.stringify(usuarioPayload),
//       headers: {'Content-Type': 'application/json'},
//     }
//   ).then(response => {
//     console.log(response)
//     if (response.status === 201) {
//       toastr["success"]("Dados salvos com sucesso!")
//       limpaFormulario()
//     } else {
//       toastr["error"]("Ooops! Algo deu errado!")
//     }
//   }).catch((error) => {
//     toastr["error"]("Ooops! Algo deu errado!")
//   }) 
// }

function listaUsuariosCadastrados(inputNome, inputEmail, inputTelefone, exibeSomenteFormulario) {
  axios.get(`http://localhost:3001/usuarios?nome=${inputNome}&email=${inputEmail}&tel=${inputTelefone}`)
    .then( response => {
      if (exibeSomenteFormulario) {
        preencheFormulario(response.data)
      } else {
        if (response.data.length === 0 ) {
          toastr["warning"](`Não existem usuários com esta combinação`)
        } else if (response.data.length === 1) {
          toastr["info"](`Foi encontrado 1 usuário`)
        } else {
          toastr["info"](`Foram encontrados ${response.data.length} usuários`)
        }
        montarTabela(response.data)
      }
    })
    .catch((error) => {
      toastr["error"]("Ooops! Algo deu errado!")
    }) 
}


function preencheFormulario (usuario) {
  if (usuario.length === 1) {
    inputNome.value = usuario[0].name
    inputTelefone.value = usuario[0].phone
    inputSenha.value = usuario[0].password
    btnAlterar.removeAttribute('disabled')
    btnAlterar.setAttribute('class', 'btn btn-outline-primary')
    btnApagar.removeAttribute('disabled')
    btnApagar.setAttribute('class', 'btn btn-outline-primary')
    idUsuario = usuario[0].id || usuario[0]._id //Postgres ou MongoDB
  }
}

function apagaUsuarioCadastrado (idUsuario) {
  axios.delete(`http://localhost:3001/usuarios/${idUsuario}`)
  .then(response => {
    if (response.status === 200) {
      toastr["success"]("Usuário apagado com sucesso!")
      limpaFormulario()
    } else {
      toastr["error"]("Ooops! Algo deu errado!")
    }
  })
}

function alteraUsuarioCadastrado (nome, email, telefone, senha) {
  const usuarioPayload = {
    "nome": inputNome.value,
    "telefone": inputTelefone.value,
    "email": inputEmail.value,
    "senha": inputSenha.value
  }
  axios.put(`http://localhost:3001/usuarios/${idUsuario}` , usuarioPayload)
  .then(response => {
    if (response.status === 200) {
      toastr["success"]("Dados alterados com sucesso!")
      limpaFormulario()
    } else {
      toastr["error"]("Ooops! Algo deu errado!")
    }
  })
}
// function listaUsuariosCadastrados() {
//   fetch('http://localhost:3001/usuarios')
//     .then(response => response.json())
//     .then(dado => {
//       montarTabela(dado)
//     })
//     .catch((error) => {
//       toastr["error"]("Ooops! Algo deu errado!")
//     }) 
// }

const table = document.querySelector('table')

function montarTabela(dado) {

  document.querySelector('tbody')?.remove()  //! FALAR SOBRE " ? "
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)


  for (i = 0; i < dado.length; i++) {
    const tr = document.createElement('tr')
    if ( i%2 !== 0 ){
      tr.setAttribute('class', 'pure-table-odd')
    }
    
    const td = document.createElement('td')
    td.textContent = dado[i].name

    const td1 = document.createElement('td')
    td1.textContent = dado[i].phone

    const td2 = document.createElement('td')
    td2.textContent = dado[i].email

    tbody.appendChild(tr)
    tr.appendChild(td)
    tr.appendChild(td1)
    tr.appendChild(td2)
    // <tbody>
    //   <tr>
    //     <td>
    //     <td1>
    //     <td2>
  }
}