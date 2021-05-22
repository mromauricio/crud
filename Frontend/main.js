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

const inputNome = document.querySelector("#nome")
const labelNome = document.querySelector("#label-nome")
inputNome.addEventListener('blur', () => validaFormulario('nome') )

const inputEmail = document.querySelector("#email")
const labelEmail = document.querySelector("#label-email")
inputEmail.addEventListener('blur', () => validaFormulario('email') )

const inputSenha = document.querySelector("#senha")
const labelSenha = document.querySelector("#label-senha")
inputSenha.addEventListener('blur', () => validaFormulario('senha') )

let existeErroNome, existeErroEmail, existeErroSenha = true
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
  validaFormulario('email')
  validaFormulario('senha')
  if (existeErroNome || existeErroEmail || existeErroSenha ) {
    toastr["error"](`Corrija os campos em vermelho!`)
  } else {
    enviarDados()
  }
}

function enviarDados(){
  const data = {
    "nome": inputNome.value,
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
  inputEmail.value = ''
  inputSenha.value = ''
}