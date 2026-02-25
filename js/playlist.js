// Utilitário global de playlist atual
window.getPlaylistAtual = () => {
    if (!window.bibliotecaSpots) return [];

    return window.bibliotecaSpots.filter(spot => {
        const segueMarca = window.marcasSeguidas?.includes(spot.anunciante);
        const selecionouSpot = window.spotsSelecionados?.includes(spot.id);
        return segueMarca || selecionouSpot;
    });
};
