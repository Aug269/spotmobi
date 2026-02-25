// === motor-biblioteca.js - MOTOR COMPLETO SPOTMOBI ===

// === CARREGAR DO LOCALSTORAGE ===
const carregarEstado = () => {
    window.marcasSeguidas = JSON.parse(localStorage.getItem('marcasSeguidas') || '[]');
    window.spotsSelecionados = JSON.parse(localStorage.getItem('spotsSelecionados') || '[]');
};

// === SALVAR NO LOCALSTORAGE ===
const salvarEstado = () => {
    localStorage.setItem('marcasSeguidas', JSON.stringify(window.marcasSeguidas));
    localStorage.setItem('spotsSelecionados', JSON.stringify(window.spotsSelecionados));
};

// === FUNÇÕES GLOBAIS ===
window.toggleSeguir = (nomeMarca) => {
    const idx = window.marcasSeguidas.indexOf(nomeMarca);
    idx > -1 ? window.marcasSeguidas.splice(idx, 1) : window.marcasSeguidas.push(nomeMarca);
    salvarEstado();
    window.motorBiblioteca.render('');
};

window.toggleSpot = (idSpot) => {
    const idx = window.spotsSelecionados.indexOf(idSpot);
    idx > -1 ? window.spotsSelecionados.splice(idx, 1) : window.spotsSelecionados.push(idSpot);
    salvarEstado();
    window.motorBiblioteca.render('');
};

// === MOTOR BIBLIOTECA ===
class MotorBiblioteca {
    constructor() {
        this.resultados = [];
    }

    inicializar() {
        carregarEstado();
        this.render('');
    }

    render(termo = '') {
        const container = document.getElementById('listaBiblioteca');
        if (!container) return;

        const termoLower = termo.toLowerCase().trim();
        this.resultados = this.coletarResultados(termoLower);

        container.innerHTML = this.resultados.length
            ? this.resultados.map(r => this.renderItem(r)).join('')
            : '<p style="text-align:center;color:#6b7280;padding:2rem;">Nada encontrado</p>';
    }

    coletarResultados(termo) {
        const todos = [];

        // Colhe marcas
        if (window.anunciantes) {
            Object.values(window.anunciantes)
                .filter(m => !termo || this.matchMarca(m, termo))
                .forEach(m => todos.push({
                    tipo: 'marca',
                    nome: m.nome,
                    categoria: m.categoria,
                    totalSpots: m.totalSpots || 0,
                    isSeguindo: window.marcasSeguidas.includes(m.nome)
                }));
        }

        // Colhe spots
        if (window.bibliotecaSpots) {
            window.bibliotecaSpots
                .filter(s => !termo || this.matchSpot(s, termo))
                .forEach(s => todos.push({
                    tipo: 'spot',
                    nome: s.nome,
                    anunciante: s.anunciante,
                    duracao: s.duracao,
                    id: s.id,
                    campanha: s.campanha,
                    ganho: (s.duracao * 0.043).toFixed(2),
                    isSelecionado: window.spotsSelecionados.includes(s.id)
                }));
        }

        // Ordena A-Z
        return todos.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
    }

    matchSpot(spot, termo) {
        return [spot.nome, spot.anunciante, spot.categoria, spot.campanha || '']
            .some(campo => campo?.toLowerCase?.().includes(termo));
    }

    matchMarca(marca, termo) {
        return [marca.nome, marca.categoria]
            .some(campo => campo?.toLowerCase?.().includes(termo));
    }

    renderItem(item) {
        return item.tipo === 'marca' ? this.renderMarca(item) : this.renderSpot(item);
    }

    renderMarca({ nome, categoria, totalSpots, isSeguindo }) {
    const corBorda = isSeguindo ? '#fbbf24' : '#94a3b8';
    const corEstrela = isSeguindo ? '#fbbf24' : '#94a3b8';
    const estrela = isSeguindo ? '★' : '☆';
    const nomeSafe = String(nome).replace(/'/g, "\\'");  // escapa apóstrofos

    return `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem;background:#1e293b;margin:0.5rem 0;border-radius:8px;border-left:4px solid ${corBorda};box-shadow:0 2px 8px rgba(0,0,0,0.2);">
            <div style="flex:1;display:flex;align-items:center;gap:0.75rem;">
                <strong style="color:#f8fafc;">${nome}</strong>
                <span style="color:#94a3b8;">${categoria}</span>
                <span style="color:#94a3b8;">${totalSpots} spots</span>
            </div>
            <button onclick="window.toggleSeguir('${nomeSafe}')" style="font-size:1.8rem;color:${corEstrela};cursor:pointer;background:none;border:none;padding:0.5rem;transition:all 0.2s;">
                ${estrela}
            </button>
        </div>`;
}


    renderSpot({ nome, anunciante, duracao, id, isSelecionado, ganho, campanha }) {
        return `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:#334155;margin:0.5rem 0;border-radius:8px;border-left:4px solid #3b82f6;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                <div style="flex:1;">
                    <strong style="color:#f8fafc;">${nome}</strong>
                    <small style="color:#cbd5e1;">${anunciante}</small>
                    ${campanha ? `<br><small style="color:#059669;">${campanha}</small>` : ''}
                </div>
                <div style="text-align:right;display:flex;flex-direction:column;gap:0.25rem;align-items:flex-end;">
                    <input type="checkbox" ${isSelecionado ? 'checked' : ''} onchange="window.toggleSpot(${id})" style="accent-color:#3b82f6;cursor:pointer;transform:scale(1.2);">
                    <div>
                        <span style="font-weight:bold;color:#fbbf24;">${duracao}s</span>
                        <small style="color:#10b981;">R$ ${ganho}</small>
                    </div>
                </div>
            </div>`;
    }
}

// === INSTÂNCIA GLOBAL ===
window.motorBiblioteca = new MotorBiblioteca();
window.renderBibliotecaCompleta = (termo = '') => window.motorBiblioteca.render(termo);

// === AUTO-INICIALIZAR ===
document.addEventListener('DOMContentLoaded', () => {
    window.motorBiblioteca.inicializar();
    console.log('✅ Biblioteca carregada:', window.motorBiblioteca.resultados.length, 'itens');
});


