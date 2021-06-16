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


const btn = document.querySelector("#botao")
btn.addEventListener('click', () => verificaTudoAntesDeEnviar())

const btnListar = document.querySelector("#listar")
btnListar.addEventListener('click', () => listaUsuariosCadastrados())

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

let existeErroNome, existeErroTelefone,existeErroEmail, existeErroSenha = true
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

function enviarDados(){
  const data = {
    "nome": inputNome.value,
    "telefone": inputTelefone.value,
    "email": inputEmail.value,
    "senha": inputSenha.value
  }
  fetch('http://localhost:3001', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }).then(response => {
    if (response.status === 201) {
      toastr["success"]("Dados encaminhados com sucesso!")
      limpaFormulario()
    }
  }).catch((error) => {
    toastr["error"]("Ooops! Algo deu errado!")
  }) 
}

function limpaFormulario(){
  inputNome.value = ''
  inputTelefone.value = ''
  inputEmail.value = ''
  inputSenha.value = ''
}

function listaUsuariosCadastrados(){
  fetch('http://localhost:3001')
    .then(response => response.json())
    .then(dado => {
      console.log(dado)
      montarTabela(dado)
    })
    .catch((error) => {
      toastr["error"]("Ooops! Algo deu errado!")
    }) 
}

const tbody = document.querySelector("#tableBody")

function montarTabela(dado) {
  for (i = 0; i < dado.length; i++) {
    const tr = document.createElement('tr')
    
    const th = document.createElement('th')
    th.setAttribute('scope','row')
    th.textContent = dado[i].id

    const td1 = document.createElement('td')
    td1.textContent = dado[i].name

    const td2 = document.createElement('td')
    td2.textContent = dado[i].phone

    const td3 = document.createElement('td')
    td3.textContent = dado[i].email

    tbody.appendChild(tr)
    tr.appendChild(th)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
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