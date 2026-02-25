// SPOTMOBI MAIN 2026 - CORE LOGIC REFATORADO
// Arquitetura: Modular + Error Handling + Performance

class SpotMobiCore {
  constructor() {
    this.destinoSelecionado = '';
    this.totalPlanMin = 45;
    this.animating = false;
    this.startTime = null;
    
    this.init();
  }
  
  init() {
    this.bindNavigation();
    this.bindTimeline();
    this.bindDestino();
    this.bindBusca();
    
    // Estado inicial
    this.atualizarSpotsTrajeto();
  }

  // 1. MENU NAVEGAÇÃO (Performance: Event Delegation)
  bindNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchScreen(e.currentTarget.dataset.screen));
    });
  }
  
  switchScreen(targetScreen) {
    const screens = document.querySelectorAll('.screen');
    const menuItems = document.querySelectorAll('.menu-item');
    
    screens.forEach(s => s.classList.remove('active'));
    menuItems.forEach(m => m.classList.remove('active'));
    
    const targetEl = document.getElementById(`screen-${targetScreen}`);
    if (targetEl) targetEl.classList.add('active');
    
    const activeBtn = document.querySelector(`[data-screen="${targetScreen}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // 2. TIMELINE CORRIDA (RAF + Estado)
  bindTimeline() {
    const btnStart = document.getElementById('btnStart');
    if (!btnStart) return;
    
    btnStart.addEventListener('click', () => this.startCorrida());
  }
  
  startCorrida() {
    if (!this.destinoSelecionado) {
      this.showAlert('Defina um destino primeiro!');
      return;
    }
    if (this.animating) return;
    
    this.animating = true;
    this.startTime = performance.now();
    
    const btn = document.getElementById('btnStart');
    btn.disabled = true;
    btn.textContent = 'Corrida em andamento...';
    
    this.animateTimeline();
  }
  
  animateTimeline() {
    if (!this.animating) return;
    
    const now = performance.now();
    const elapsed = now - this.startTime;
    const totalMs = this.totalPlanMin * 60 * 1000;
    const progress = Math.min(elapsed / totalMs, 1);
    const currentMin = Math.round(progress * this.totalPlanMin);
    
    // UI UPDATE
    const slider = document.getElementById('timelineSlider');
    const counter = document.getElementById('timelineCounter');
    const timeline = document.getElementById('timeline');
    
    if (slider && timeline) {
      const barWidth = timeline.offsetWidth;
      slider.style.left = `${progress * barWidth}px`;
    }
    
    if (counter) counter.textContent = `${currentMin} min`;
    
    if (progress < 1) {
      requestAnimationFrame(() => this.animateTimeline());
    } else {
      this.endCorrida();
    }
  }
  
  endCorrida() {
    this.animating = false;
    const btn = document.getElementById('btnStart');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Corrida concluída!';
      setTimeout(() => btn.textContent = 'Nova Corrida', 2000);
    }
  }

  // 3. DESTINO → TIMELINE + SPOTS
  bindDestino() {
    const btnSalvarDestino = document.getElementById('btnSalvarDestino');
    if (!btnSalvarDestino) return;
    
    btnSalvarDestino.addEventListener('click', () => this.processarDestino());
  }
  
  processarDestino() {
    const input = document.getElementById('destinoInput');
    const atual = document.getElementById('destinoAtual');
    
    if (!input || !atual) return;
    
    const texto = input.value.trim();
    if (!texto) {
      this.destinoSelecionado = '';
      atual.textContent = 'Nenhum destino';
      this.totalPlanMin = 45;
      this.atualizarSpotsTrajeto();
      return;
    }
    
    // CÁLCULO DURAÇÃO
    this.destinoSelecionado = texto;
    atual.textContent = `Destino: ${texto}`;
    
    const lower = texto.toLowerCase();
    this.totalPlanMin = lower.includes('centro') ? 20 : 
                       lower.includes('paulista') ? 35 : 45;
    
    document.getElementById('totalPlanMin').textContent = `${this.totalPlanMin} min`;
    this.atualizarSpotsTrajeto();
  }

  // 4. BIBLIOTECA BUSCA
  bindBusca() {
    const buscaInput = document.getElementById('buscaSpots');
    if (buscaInput) {
      buscaInput.addEventListener('input', (e) => {
        window.motorBiblioteca?.filtrar(e.target.value);
      });
    }
  }

  // 5. SPOTS TRAJETO (Playlist Integration)
  atualizarSpotsTrajeto() {
    const lista = document.getElementById('listaSpotsTrajeto');
    const totalSpots = document.getElementById('totalSpotsTrajeto');
    const duracaoTotal = document.getElementById('duracaoTotalSpots');
    
    if (!lista) return;
    
    const playlist = window.getPlaylistAtual?.() || [];
    lista.innerHTML = '';
    
    if (!this.destinoSelecionado || !playlist.length) {
      lista.innerHTML = '<div class="spot-placeholder">Destino + playlist vazia</div>';
      if (totalSpots) totalSpots.textContent = '0';
      if (duracaoTotal) duracaoTotal.textContent = '0 min';
      return;
    }
    
    // RENDER PLAYLIST
    playlist.slice(0, 8).forEach(spot => { // Max 8 spots
      const item = document.createElement('div');
      item.className = 'spot-item';
      item.innerHTML = `<span>${spot.nome}</span><span>${spot.duracao}s</span>`;
      lista.appendChild(item);
    });
    
    if (totalSpots) totalSpots.textContent = playlist.length;
    if (duracaoTotal) {
      const totalMin = Math.round(playlist.reduce((sum, s) => sum + s.duracao, 0) / 60);
      duracaoTotal.textContent = `${totalMin} min`;
    }
  }

  // UTILITIES
  showAlert(msg) {
    alert(msg);
  }
}

// GLOBAL INIT + EXPORTS
window.SpotMobiCore = SpotMobiCore;
document.addEventListener('DOMContentLoaded', () => {
  window.spotmobi = new SpotMobiCore();
  window.atualizarSpotsTrajeto = () => window.spotmobi?.atualizarSpotsTrajeto();
});
