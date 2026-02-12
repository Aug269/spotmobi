// "banco" em memória
const corridas = [];

let corridaAtual = null;

function iniciarCorrida(destino, valorPorSpot = 0.05) {
  corridaAtual = {
    id: Date.now(),
    destino,
    duracaoMin: 0,
    spotsTocados: 0,
    valorPorSpot,
    valorTotal: 0,
    dataHoraInicio: new Date()
  };
}

function registrarTempo(minutos) {
  if (!corridaAtual) return;
  corridaAtual.duracaoMin += minutos;
}

function registrarSpotTocado() {
  if (!corridaAtual) return;
  corridaAtual.spotsTocados++;
  corridaAtual.valorTotal = corridaAtual.spotsTocados * corridaAtual.valorPorSpot;
}
registrarTempo(totalPlanMin);


function encerrarCorrida() {
  if (!corridaAtual) return;
  corridas.push({ ...corridaAtual, dataHoraFim: new Date() });
  corridaAtual = null;
}

function listarCorridas() {
  return corridas;
}


function renderizarCorridas() {
  const container = document.getElementById('corridasList');
  if (!container) return;

  const lista = listarCorridas();

  if (!lista.length) {
    container.innerHTML = '<p class="destino-atual">Nenhuma corrida simulada ainda.</p>';
    return;
  }

  container.innerHTML = '';

  lista.forEach((corrida) => {
    const item = document.createElement('div');
    item.className = 'corrida-item';

    const data = corrida.dataHoraInicio
      ? new Date(corrida.dataHoraInicio)
      : null;

    const dataFormatada = data
      ? data.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
      : '';

    item.innerHTML = `
      <div class="corrida-titulo">${corrida.destino || 'Destino não informado'}</div>
      <div class="corrida-info">
        ${dataFormatada} • ${corrida.duracaoMin} min •
        ${corrida.spotsTocados} spots •
        R$ ${corrida.valorTotal.toFixed(2)}
      </div>
    `;

    container.appendChild(item);
  });
}

