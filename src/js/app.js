//Botão Share do navbar
let share = document.getElementById('share');

share.addEventListener('click', function copyUrl() {
  let novoInput = document.body.appendChild(document.createElement('input'));
  novoInput.value = window.location.href;
  novoInput.focus();
  novoInput.select();
  document.execCommand('copy');
  novoInput.parentNode.removeChild(novoInput);
  alert(
    'ENDEREÇO (URL) DO WEBSITE COPIADO, COMPARTILHE!\n' +
      '\nUtilize os botões no rodapé da página para nais opções de compartilhamento!',
  );
});

//Form de Contato
const contatoForm = document.querySelector('.form-contato');
let nome = document.getElementById('nome');
let email = document.getElementById('email');
let assunto = document.getElementById('assunto');
let mensagem = document.getElementById('mensagem');
let inputSubmit = document.getElementById('enviar');

contatoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  enviar.disabled = true;

  let formData = {
    nome: nome.value,
    email: email.value,
    assunto: assunto.value,
    mensagem: mensagem.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    if (xhr.responseText == 'success') {
      alert('Mensagem enviada com sucesso!');
      nome.value = '';
      email.value = '';
      assunto.value = '';
      mensagem.value = '';
    } else {
      alert('Algo deu errado...\nComunique: luciano.rocha.dev@gmail.com');
    }

    enviar.disabled = false;
  };

  xhr.send(JSON.stringify(formData));
});
