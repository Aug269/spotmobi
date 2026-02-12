(function() {
  window.inicializarBiblioteca = function() {
    if (!document.getElementById('screen-biblioteca')?.classList.contains('active')) return;
    window.renderBibliotecaAvancada('');
  };
  
  const campoBusca = document.getElementById('buscaSpots');
  if (campoBusca) {
    let timeout;
    campoBusca.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        window.renderBibliotecaAvancada(e.target.value);
      }, 200);
    });
  }
})();

