// screen-menu.js
function criarMenu() {
  if (document.getElementById('menu-container')) return; // já existe

  const menuContainer = document.createElement('div');
  menuContainer.id = 'menu-container';
  menuContainer.innerHTML = `
    <nav class="bottom-menu">
      <button class="menu-item active" data-screen="inicio">Início</button>
      <button class="menu-item" data-screen="corridas">Corridas</button>
      <button class="menu-item" data-screen="biblioteca">Biblioteca</button>
    </nav>
  `;
  document.body.appendChild(menuContainer);

  const menuItems = menuContainer.querySelectorAll('.menu-item');
  menuItems.forEach(btn => {
    btn.addEventListener('click', () => {
      menuItems.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-screen');
      mostrarTela('screen-' + target);
    });
  });
}
