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
btn.addEventListener('click', () => validaFormulario())

const inputNome = document.querySelector("#nome")
const inputEmail = document.querySelector("#email")
const inputSenha = document.querySelector("#senha")

function validaFormulario () {
  if (inputNome.value.trim().length == 0 ) {
    toastr["error"]("Nome não pode ser em branco")
  }
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.value))
  {
    toastr["error"]("Email inválido")
  }
  if (inputSenha.value.length <= 7){
    toastr["error"]("Senha menor que 8 dígitos")
  }
  else {
    enviarDados();
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
    toastr["error"]("Ocorreu problema!")
  }) 
}

function limpaFormulario(){
  inputNome.value = ''
  inputEmail.value = ''
  inputSenha.value = ''
}