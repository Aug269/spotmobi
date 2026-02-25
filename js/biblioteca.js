// js/biblioteca.js - MOTOR SPOTMOBI 2026
// Render marcas★ + spots checkbox + Playlist global

class MotorBiblioteca {
  constructor() {
    this.resultados = []; // Marcas + spots misturados
    this.marcasSeguidas = JSON.parse(localStorage.getItem('marcasSeguidas') || '[]');
    this.spotsSelecionados = JSON.parse(localStorage.getItem('spotsSelecionados') || '[]');
    
    this.init();
  }
  
  init() {
    this.carregarDados();
    this.render();
    window.motorBiblioteca = this; // Global access
  }

  carregarDados() {
    // DADOS FIXOS (futuro: Firebase)
    window.marcas = [ // anunciantes.js
      { nome: 'McDonald\'s', categoria: 'Fast Food', totalSpots: 12 },
      { nome: 'Coca-Cola', categoria: 'Bebidas', totalSpots: 8 },
      { nome: 'Uber Eats', categoria: 'Delivery', totalSpots: 15 },
      { nome: 'Petrobras', categoria: 'Combustível', totalSpots: 6 },
      { nome: 'iFood', categoria: 'Delivery', totalSpots: 10 },
      { nome: 'Shopping Centers', categoria: 'Varejo', totalSpots: 9 }
    ];
    
    window.spotsBiblioteca = [ // spots.js
      { id: 1, nome: 'Big Mac Combo', anunciante: 'McDonald\'s', duracao: 30, categoria: 'Fast Food' },
      { id: 2, nome: 'Coca-Cola sempre gelada', anunciante: 'Coca-Cola', duracao: 28, categoria: 'Bebidas' },
      { id: 8, nome: 'Uber Eats grátis entrega', anunciante: 'Uber Eats', duracao: 35, categoria: 'Delivery' },
      // +10 spots...
    ];
    
    // MIX MARCAS + SPOTS
    this.resultados = [
      ...window.marcas.map(m => ({ ...m, tipo: 'marca' })),
      ...window.spotsBiblioteca.map(s => ({ ...s, tipo: 'spot' }))
    ];
  }

  render(query = '') {
    const container = document.getElementById('listaBiblioteca');
    if (!container) return;
    
    const filtrados = this.filtrar(query);
    container.innerHTML = filtrados.map(item => this.renderItem(item)).join('');
  }

  renderItem(item) {
    if (item.tipo === 'marca') {
      const isSeguindo = this.marcasSeguidas.includes(item.nome);
      return `
        <div class="marca-card ${isSeguindo ? 'seguindo' : ''}">
          <div style="flex:1; display:flex; gap:0.75rem; align-items:center;">
            <strong style="color:#f8fafc;">${item.nome}</strong>
            <span style="color:#94a3b8; font-size:0.85rem;">${item.categoria}</span>
            <span style="color:#94a3b8;">${item.totalSpots} spots</span>
          </div>
          <button onclick="window.motorBiblioteca.toggleSeguir('${item.nome.replace(/'/g, "\\'")}')" 
                  class="estrela" style="font-size:1.5rem; color:${isSeguindo ? '#fbbf24' : '#94a3b8'};">★</button>
        </div>`;
    }
    
    const isSelecionado = this.spotsSelecionados.includes(item.id);
    return `
      <div class="spot-card">
        <div style="flex:1;">
          <strong>${item.nome}</strong>
          <span style="color:#94a3b8;">${item.duracao}s • ${item.categoria}</span>
        </div>
        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
          <input type="checkbox" ${isSelecionado ? 'checked' : ''} 
                 onchange="window.motorBiblioteca.toggleSpot(${item.id})">
          <span style="font-size:0.85rem; color:#94a3b8;">Incluir</span>
        </label>
      </div>`;
  }

  filtrar(query) {
    const q = query.toLowerCase();
    return this.resultados.filter(item => 
      item.nome.toLowerCase().includes(q) || 
      item.categoria.toLowerCase().includes(q)
    );
  }

  // FAVORITOS ★
  toggleSeguir(nome) {
    const idx = this.marcasSeguidas.indexOf(nome);
    if (idx > -1) {
      this.marcasSeguidas.splice(idx, 1);
    } else {
      this.marcasSeguidas.push(nome);
    }
    localStorage.setItem('marcasSeguidas', JSON.stringify(this.marcasSeguidas));
    this.render();
  }

  // CHECKBOX SPOTS
  toggleSpot(id) {
    const idx = this.spotsSelecionados.indexOf(id);
    if (idx > -1) {
      this.spotsSelecionados.splice(idx, 1);
    } else {
      this.spotsSelecionados.push(id);
    }
    localStorage.setItem('spotsSelecionados', JSON.stringify(this.spotsSelecionados));
    this.render();
  }

  // PLAYLIST GLOBAL (para main.js)
  getPlaylistAtual() {
    return window.spotsBiblioteca.filter(spot => 
      this.marcasSeguidas.includes(spot.anunciante) || 
      this.spotsSelecionados.includes(spot.id)
    );
  }
}

// INIT GLOBAL
window.motorBiblioteca = new MotorBiblioteca();
window.getPlaylistAtual = () => window.motorBiblioteca?.getPlaylistAtual?.() || [];
