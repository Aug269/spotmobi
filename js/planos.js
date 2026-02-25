// js/planos.js - SISTEMA PRO/PREMIUM MOTORISTAS 2026
class SpotMobiPlanos {
  constructor() {
    this.planos = {
      free:     { nome: 'Gratuito', preco: 0, ganhoSpot: 0.20 },
      pro:      { nome: 'Pro', preco: 19.90, ganhoSpot: 0.30 },
      premium:  { nome: 'Premium', preco: 49.90, ganhoSpot: 0.40 }
    };
    this.planoAtual = 'free';
    
    this.init();
  }
  
  init() {
    this.carregar();
    this.bindEventos();
    this.atualizarUI();
  }

  // ASSINATURA
  assinar(plano) {
    const planoData = this.planos[plano];
    if (!planoData) return;
    
    if (confirm(`Assinar ${planoData.nome}?\n💰 R$${planoData.preco}/mês\n💵 +${(planoData.ganhoSpot*100)}¢/spot`)) {
      this.planoAtual = plano;
      localStorage.setItem('planoMotorista', plano);
      
      // Stripe webhook futuro
      console.log(`Assinatura ${plano} confirmada!`);
      
      this.atualizarUI();
      window.motorBiblioteca?.render(); // Re-render biblioteca
    }
  }

  // GANHO ATUAL (Integra biblioteca)
  getGanhoSpotAtual() {
    return this.planos[this.planoAtual].ganhoSpot;
  }

  // PERSISTÊNCIA
  carregar() {
    const saved = localStorage.getItem('planoMotorista');
    this.planoAtual = this.planos[saved] ? saved : 'free';
  }

  // UI UPDATE GLOBAL
  atualizarUI() {
    const planoAtualEl = document.getElementById('planoAtual');
    const ganhoEls = document.querySelectorAll('.ganho-atual');
    
    if (planoAtualEl) {
      planoAtualEl.textContent = this.planos[this.planoAtual].nome;
    }
    
    const ganhoAtual = this.getGanhoSpotAtual();
    ganhoEls.forEach(el => el.textContent = `R$${ganhoAtual}`);
    
    // Ganho total estimado (exemplo)
    const totalCorridas = 25; // Mock
    const ganhoMensalEl = document.querySelector('.ganho-mensal');
    if (ganhoMensalEl) {
      ganhoMensalEl.textContent = `R$${(ganhoAtual * totalCorridas * 30).toFixed(0)}/mês`;
    }
  }

  // EVENTOS BOTÕES
  bindEventos() {
    document.querySelectorAll('[data-plano]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.assinar(btn.dataset.plano);
      });
    });
  }
}

// GLOBAL EXPORTS
window.planos = new SpotMobiPlanos();
window.getGanhoPorSpotAtual = () => window.planos?.getGanhoSpotAtual?.() || 0.20;
