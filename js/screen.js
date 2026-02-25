const telas = document.querySelectorAll('.screen');
const telasComMenu = ['screen-inicio', 'screen-corridas', 'screen-biblioteca'];

function mostrarTela(idTela) {
  telas.forEach(t => t.classList.remove('active'));
  const alvo = document.getElementById(idTela);
  if (alvo) alvo.classList.add('active');

  const menuContainer = document.getElementById('menu-container');
  if (menuContainer) {
    menuContainer.style.display = telasComMenu.includes(idTela) ? 'block' : 'none';
  }
}

function configurarAuth() {
  document.getElementById('btnIrCadastro').onclick      = () => mostrarTela('screen-cadastro');
  document.getElementById('btnIrLogin').onclick         = () => mostrarTela('screen-login');
  document.getElementById('btnCadastroVoltar').onclick  = () => mostrarTela('screen-auth');
  document.getElementById('btnLoginVoltar').onclick     = () => mostrarTela('screen-auth');

  document.getElementById('btnCadastroConfirmar').onclick = () => {
    criarMenu();
    mostrarTela('screen-inicio');
  };

  document.getElementById('btnLoginConfirmar').onclick = () => {
    criarMenu();
    mostrarTela('screen-inicio');
  };
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarTela('screen-auth');
  configurarAuth();
});
