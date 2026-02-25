// === TIMELINE / CORRIDA ===
const slider = document.getElementById('timelineSlider');
const counter = document.getElementById('timelineCounter');
const timeline = document.getElementById('timeline');
const btnStart = document.getElementById('btnStart');
const totalPlanMinLabel = document.getElementById('totalPlanMin');

let animating = false;
let totalPlanMin = 60;
let inicioReal = null;
let fimReal = null;
let destinoSelecionado = '';

// Botão iniciar corrida
if (btnStart) {
  btnStart.addEventListener('click', () => {
    if (!destinoSelecionado) {
      alert('Defina um destino antes de iniciar a corrida.');
      return;
    }

    if (animating) return;
    animating = true;

    // registra início da corrida (se existir módulo)
    if (typeof iniciarCorrida === 'function') {
      iniciarCorrida(destinoSelecionado);
    }

    inicioReal = Date.now();
    fimReal = inicioReal + totalPlanMin * 60 * 1000;

    btnStart.disabled = true;
    btnStart.textContent = '⏱️ Corrida em andamento...';
    requestAnimationFrame(animateTimeline);
  });
}

function animateTimeline() {
  if (!animating) return;

  const agora = Date.now();
  const progress = Math.min((agora - inicioReal) / (fimReal - inicioReal), 1);
  const currentMin = Math.round(progress * totalPlanMin);

  // (Opcional) integrar tempo com spots, se precisar
  if (typeof configurarSpotsNaCorrida === 'function') {
    configurarSpotsNaCorrida(currentMin);
  }

  const barWidth = timeline ? timeline.offsetWidth : 0;
  const leftPx = progress * barWidth;
  if (slider) slider.style.left = leftPx + 'px';
  if (counter) counter.textContent = currentMin + ' min';

  if (progress < 1) {
    requestAnimationFrame(animateTimeline);
  } else {
    animating = false;

    if (typeof registrarTempo === 'function') {
      registrarTempo(totalPlanMin);
    }
    if (typeof encerrarCorrida === 'function') {
      encerrarCorrida();
    }

    if (btnStart) {
      btnStart.disabled = false;
      btnStart.textContent = '▶️ Iniciar corrida';
    }
  }
}

// === DESTINO + DURAÇÃO PLANEJADA ===
const destinoInput = document.getElementById('destinoInput');
const destinoAtual = document.getElementById('destinoAtual');
const btnSalvarDestino = document.getElementById('btnSalvarDestino');

if (btnSalvarDestino) {
  btnSalvarDestino.addEventListener('click', () => {
    const texto = destinoInput.value.trim();
    

    if (!texto) {
      destinoSelecionado = '';
      if (destinoAtual) destinoAtual.textContent = 'Nenhum destino selecionado.';
      totalPlanMin = 60;
      if (totalPlanMinLabel) totalPlanMinLabel.textContent = totalPlanMin + ' min';
      atualizarSpotsTrajeto(); // limpa lista
      return;
    }

    destinoSelecionado = texto;
    if (destinoAtual) destinoAtual.textContent = 'Destino selecionado: ' + texto;

    const lower = texto.toLowerCase();
    if (lower.includes('centro')) {
      totalPlanMin = 20;
    } else if (lower.includes('paulista')) {
      totalPlanMin = 35;
    } else {
      totalPlanMin = 45;
    }

    if (totalPlanMinLabel) {
      totalPlanMinLabel.textContent = totalPlanMin + ' min';
    }

    atualizarSpotsTrajeto();
  });
}

// === SPOTS DO TRAJETO (USANDO PLAYLIST) ===
function atualizarSpotsTrajeto() {
  const lista = document.getElementById('listaSpotsTrajeto');
  const totalSpotsLabel = document.getElementById('totalSpotsTrajeto');
  const duracaoTotalLabel = document.getElementById('duracaoTotalSpots');

  if (!lista) return;

  lista.innerHTML = '';

  if (!destinoSelecionado) {
    lista.innerHTML = '<div class="spot-placeholder"><span>Selecione um destino para ver os spots</span></div>';
    if (totalSpotsLabel) totalSpotsLabel.textContent = '0 spots';
    if (duracaoTotalLabel) duracaoTotalLabel.textContent = '0 min';
    return;
  }

  const playlist = window.getPlaylistAtual ? window.getPlaylistAtual() : [];

  if (!playlist.length) {
    lista.innerHTML = '<div class="spot-placeholder"><span>Nenhum spot na sua playlist (favorite marcas ou selecione spots na biblioteca).</span></div>';
    if (totalSpotsLabel) totalSpotsLabel.textContent = '0 spots';
    if (duracaoTotalLabel) duracaoTotalLabel.textContent = '0 min';
    return;
  }

  playlist.forEach(spot => {
    const item = document.createElement('div');
    item.className = 'spot-item';
    item.innerHTML = `
      <span class="spot-nome">${spot.nome}</span>
      <span class="spot-duracao">${spot.duracao}s</span>
    `;
    lista.appendChild(item);
  });

  if (totalSpotsLabel) {
    totalSpotsLabel.textContent = `${playlist.length} spots`;
  }
  if (duracaoTotalLabel) {
    const totalMin = Math.round(playlist.reduce((sum, s) => sum + s.duracao, 0) / 60);
    duracaoTotalLabel.textContent = `${totalMin} min`;
  }
}
