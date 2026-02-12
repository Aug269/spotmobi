// === ui-screens.js - NAVEGAÇÃO E UI SPOTMOBI ===

// === MOSTRAR TELA ===
function mostrarTela(idTela) {
  const telas = document.querySelectorAll('.screen');
  telas.forEach(t => t.classList.remove('active'));
  document.getElementById(idTela).classList.add('active');

  // Menu visibility
  const menuContainer = document.getElementById('menu-container');
  if (menuContainer) {
    const telasSemMenu = ['screen-auth', 'screen-login', 'screen-cadastro'];
    menuContainer.style.display = telasSemMenu.includes(idTela) ? 'none' : 'block';
  }
  
  if (idTela === 'screen-inicio') {
    // tenta pegar localização atual ao entrar na tela de início
    if (typeof obterOrigemAtual === 'function') {
      obterOrigemAtual();
    }
  }

  // Biblioteca: inicializa motor
  if (idTela === 'screen-biblioteca') {
    setTimeout(() => {
      if (window.motorBiblioteca) {
        window.motorBiblioteca.inicializar();
      }
    }, 100);
  }
}

// === NAVEGAÇÃO AUTENTICAÇÃO ===
const navegacao = {
  btnLoginConfirmar: () => {
    mostrarTela('screen-inicio');
    if (typeof criarMenu === 'function') criarMenu();
  },
  btnIrCadastro: () => mostrarTela('screen-cadastro'),
  btnIrLogin: () => mostrarTela('screen-login'),
  btnCadastroVoltar: () => mostrarTela('screen-auth'),
  btnLoginVoltar: () => mostrarTela('screen-auth'),
  btnCadastroConfirmar: () => {
    // TODO: Implement signup logic
    mostrarTela('screen-auth');
  }
};

// Attach event listeners
Object.entries(navegacao).forEach(([btnId, handler]) => {
  const btn = document.getElementById(btnId);
  if (btn) btn.addEventListener('click', handler);
});

// === BUSCA BIBLIOTECA ===
document.addEventListener('DOMContentLoaded', () => {
  const buscaInput = document.getElementById('buscaSpots');
  if (buscaInput) {
    buscaInput.addEventListener('input', (e) => {
      if (window.renderBibliotecaCompleta) {
        window.renderBibliotecaCompleta(e.target.value);
      }
    });
  }
});

// === COMPATIBILIDADE ===
window.mostrarTela = mostrarTela;