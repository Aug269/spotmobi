// === spot.js - DADOS E ESTADO SPOTMOBI ===

// Dados brutos de spots
const bibliotecaSpots = [
    { id: 1, nome: "Big Mac gelado pro verão", anunciante: "McDonald's", duracao: 30, categoria: "Fast Food", campanha: "Verão Big Mac" },
    { id: 2, nome: "Combo família verão", anunciante: "McDonald's", duracao: 25, categoria: "Fast Food", campanha: "Verão Big Mac" },
    { id: 3, nome: "iFood 20% OFF hoje", anunciante: "iFood", duracao: 25, categoria: "Delivery", campanha: null },
    { id: 4, nome: "Petrobras Premium economiza", anunciante: "Petrobras", duracao: 20, categoria: "Combustível", campanha: "Combustível Premium" },
    { id: 5, nome: "Posto Petrobras perto", anunciante: "Petrobras", duracao: 22, categoria: "Combustível", campanha: "Combustível Premium" },
    { id: 6, nome: "Uber viagem segura", anunciante: "Uber", duracao: 35, categoria: "Mobilidade", campanha: null },
    { id: 7, nome: "Shopping BF 50% off", anunciante: "Shopping Paulista", duracao: 45, categoria: "Shopping", campanha: "Black Friday" },
    { id: 8, nome: "Coca-Cola sempre gelada", anunciante: "Coca-Cola", duracao: 28, categoria: "Bebidas", campanha: null }
];

// Global
window.bibliotecaSpots = bibliotecaSpots;

// === ANUNCIANTES (MARCAS) ===
window.anunciantes = {
    mcdonalds: { nome: "McDonald's", categoria: "Fast Food", totalSpots: 2 },
    ifood: { nome: "iFood", categoria: "Delivery", totalSpots: 1 },
    petrobas: { nome: "Petrobras", categoria: "Combustível", totalSpots: 2 },
    uber: { nome: "Uber", categoria: "Mobilidade", totalSpots: 1 },
    shoppingPaulista: { nome: "Shopping Paulista", categoria: "Shopping", totalSpots: 1 },
    cocacola: { nome: "Coca-Cola", categoria: "Bebidas", totalSpots: 1 }
};

// === ESTADO GLOBAL (inicializado vazio, carregará no motor-biblioteca.js) ===
window.marcasSeguidas = [];
window.spotsSelecionados = [];

// ✅ TUDO O QUE VINHA DEPOIS FOI REMOVIDO
// renderBibliotecaAvancada() → agora é motor-biblioteca.js
// toggleSeguir() → agora é motor-biblioteca.js
// toggleSpot() → agora é motor-biblioteca.js
