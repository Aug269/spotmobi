
// controla em que minuto o próximo spot deve tocar
let proximoMinutoSpot = 1;

// chamada pelo motor de corrida, passando o minuto atual
function configurarSpotsNaCorrida(currentMin) {
  // se ainda não começou corridaAtual, não faz nada
  if (!corridaAtual) return;

  // 1 spot por minuto: 1, 2, 3, ...
  if (currentMin >= proximoMinutoSpot && currentMin <= corridaAtual.duracaoMin) {
    registrarSpotTocado();    // função de corridas.js
    atualizarSpotsNaTela();   // atualiza card na UI
    proximoMinutoSpot += 1;
  }
}

// atualiza o card "Spots desta corrida" na tela
function atualizarSpotsNaTela() {
  if (!corridaAtual) return;

  const elSpots = document.getElementById('spotsCorridaAtual');
  const elValor = document.getElementById('valorCorridaAtual');

  if (!elSpots || !elValor) return;

  elSpots.textContent = corridaAtual.spotsTocados;
  elValor.textContent = corridaAtual.valorTotal.toFixed(2).replace('.', ',');
}
