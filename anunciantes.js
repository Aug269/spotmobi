// anunciantes.js - Marcas e campanhas do SpotMobi (REFACTORADO)
window.marcasSeguidas = JSON.parse(localStorage.getItem('marcasSeguidas')) || ['McDonald\'s'];

const anunciantes = {
  mcdonalds: {
    nome: "McDonald's",
    categoria: "Fast Food",
    campanhas: {
      veraoBigMac: { nome: "Verão Big Mac", ativa: true, spots: [1, 2], ganhoPorSpot: 0.45 }
    },
    totalSpots: 2,
    totalGanhos: 1.35
  },
  petrobas: {
    nome: "Petrobras",
    categoria: "Combustível",
    campanhas: {
      premium: { nome: "Combustível Premium", ativa: true, spots: [4, 5], ganhoPorSpot: 0.35 }
    },
    totalSpots: 2,
    totalGanhos: 0.00
  },
  ifood: {
    nome: "iFood",
    categoria: "Delivery",
    totalSpots: 1,
    totalGanhos: 0.75
  },
  uber: {
    nome: "Uber",
    categoria: "Mobilidade",
    totalSpots: 1,
    totalGanhos: 0.00
  },
  shoppingPaulista: {
    nome: "Shopping Paulista",
    categoria: "Shopping",
    campanhas: {
      blackFriday: { nome: "Black Friday", ativa: true, spots: [7], ganhoPorSpot: 0.85 }
    },
    totalSpots: 1,
    totalGanhos: 0.00
  },
  cocacola: {
    nome: "Coca-Cola",
    categoria: "Bebidas",
    totalSpots: 1,
    totalGanhos: 0.00
  }
};

// API pública
window.anunciantes = anunciantes;

// Atualiza status seguindo
Object.values(anunciantes).forEach(anon => {
  anon.seguindo = window.marcasSeguidas.includes(anon.nome);
});

// ===== RENDER BIBLIOTECA ANUNCIANTES =====
// anunciantes.js - Marcas no MESMO estilo dos spots
window.renderAnunciantes = function(containerId = 'listaBiblioteca') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = Object.values(window.anunciantes).map(anon => {
    const isSeguindo = anon.seguindo;
    
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:#334155;margin:0.5rem 0;border-radius:8px;border-left:4px solid #fbbf24;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
        <div style="flex:1;">
          <strong style="color:#f8fafc;font-size:1rem;">${anon.nome}</strong><br>
          <small style="color:#cbd5e1;">${anon.categoria}</small>
        </div>
        <div style="text-align:right;display:flex;align-items:center;gap:0.5rem;">
          <button onclick="window.toggleAnunciante('${anon.nome}')" 
                  style="background:none;border:none;font-size:1.8rem;color:${isSeguindo ? '#fbbf24' : '#94a3b8'};cursor:pointer;padding:0.25rem;"
                  title="${isSeguindo ? 'Deixar de seguir' : 'Seguir marca'}">
            ${isSeguindo ? '★' : '☆'}
          </button>
          <span style="font-weight:bold;color:#fbbf24;">${anon.totalSpots}s</span>
        </div>
      </div>
    `;
  }).join('');
};



// Toggle anunciante
window.toggleAnunciante = function(nome) {
  const index = window.marcasSeguidas.indexOf(nome);
  if (index > -1) {
    window.marcasSeguidas.splice(index, 1);
  } else {
    window.marcasSeguidas.push(nome);
  }
  
  localStorage.setItem('marcasSeguidas', JSON.stringify(window.marcasSeguidas));
  
  // Atualiza status
  Object.values(window.anunciantes).forEach(anon => {
    anon.seguindo = window.marcasSeguidas.includes(anon.nome);
  });
  
  // Re-render
  window.renderAnunciantes();
};

// Compatibilidade com spot.js
window.toggleSeguir = window.toggleAnunciante;
