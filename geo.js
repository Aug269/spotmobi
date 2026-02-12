// geo.js

// Mostra a origem atual no elemento #origemAtual (crie no HTML se quiser)
function obterOrigemAtual() {
  if (!navigator.geolocation) {
    console.warn('Geolocalização não é suportada neste navegador.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log('Posição atual:', latitude, longitude);

      // Guarda globalmente (você usa depois na API de rotas)
      window.origemAtual = { latitude, longitude };

      const origemLabel = document.getElementById('origemAtual');
      if (origemLabel) {
        origemLabel.textContent = `Origem: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      }
    },
    (erro) => {
      console.error('Erro ao obter localização:', erro);
      alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}
