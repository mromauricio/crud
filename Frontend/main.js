
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


const btnIncluir = document.querySelector("#botao")
btnIncluir.addEventListener('click', () => verificaTudoAntesDeEnviar())

const btnListar = document.querySelector("#listar")
btnListar.addEventListener('click', () => listaUsuariosCadastrados(inputNome.value, inputEmail.value, inputTelefone.value))


const inputNome = document.querySelector("#nome")
const labelNome = document.querySelector("#label-nome")
inputNome.addEventListener('blur', () => validaFormulario('nome') )

const inputTelefone = document.querySelector("#telefone")
const labelTelefone = document.querySelector("#label-telefone")
inputTelefone.addEventListener('blur', () => validaFormulario('telefone') )

const inputEmail = document.querySelector("#email")
const labelEmail = document.querySelector("#label-email")
inputEmail.addEventListener('blur', () => validaFormulario('email') )

const inputSenha = document.querySelector("#senha")
const labelSenha = document.querySelector("#label-senha")
inputSenha.addEventListener('blur', () => validaFormulario('senha') )

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

function limpaFormulario(){
  inputNome.value = ''
  inputTelefone.value = ''
  inputEmail.value = ''
  inputSenha.value = ''
}

function listaUsuariosCadastrados(inputNome, inputEmail, inputTelefone) {
  axios.get(`http://localhost:3001/usuarios?nome=${inputNome}&email=${inputEmail}&tel=${inputTelefone}`)
    .then( response => {
      if (response.data.length === 0) {
        toastr["warning"](`Não existem registros com esta combinação`)
      } else {
        toastr["info"](`Foram encontrados ${response.data.length} registros`)
      }
      montarTabela(response.data)
    })
    .catch((error) => {
      toastr["error"]("Ooops! Algo deu errado!")
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

  document.querySelector('tbody').remove()  //! Quando não existe tbody dá CHABU

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
  }


    // const tr = document.createElement('tr')
    
    // const th = document.createElement('th')
    // th.setAttribute('scope','row')
    // th.textContent = '123'

    // const td1 = document.createElement('td')
    // td1.textContent = 'Mauricio'

    // const td2 = document.createElement('td')
    // td2.textContent = '(21)97538-6601'

    // const td3 = document.createElement('td')
    // td3.textContent = 'mro@gmail.com'

    
    // tbody.appendChild(tr)
    // tr.appendChild(th)
    // tr.appendChild(td1)
    // tr.appendChild(td2)
    // tr.appendChild(td3)
}