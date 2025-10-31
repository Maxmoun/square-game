// src/main.js
import { Game } from './classes/Game.js'; 

const canvas = document.getElementById('gameCanvas');
const scoreDisplay = document.getElementById('current-score');
const highScoreDisplay = document.getElementById('high-score');
const startButton = document.getElementById('startButton');

let gameInstance; 
let gameLoopId;
let isGameActive = false;

// NOTE : Les appels PHP ont été remplacés par le stockage local (localStorage) 
// pour simplifier l'exécution sans serveur PHP, comme dans votre code initial.

function getHighScore() {
    // Récupère le meilleur score du stockage local
    const highscore = localStorage.getItem('sheepRunnerHighscore') || '0';
    highScoreDisplay.textContent = highscore;
    return parseInt(highscore);
}

function saveScore(score) {
    // Enregistre le score si c'est un nouveau meilleur score
    const currentHighscore = getHighScore();
    if (score > currentHighscore) {
        localStorage.setItem('sheepRunnerHighscore', score.toString());
        highScoreDisplay.textContent = score.toString();
    }
}

// --- Game Loop and Control ---

function updateGame() {
    const continueGame = gameInstance.update(); 
    scoreDisplay.textContent = Math.floor(gameInstance.score / 10); 
    
    if (!continueGame) {
        endGame();
    }
}

function drawGame() {
    gameInstance.draw();
}

function gameLoop() {
    updateGame();
    drawGame();
    if (isGameActive) {
        gameLoopId = requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    if (isGameActive) return;
    
    gameInstance.reset(); 
    isGameActive = true;
    startButton.style.display = 'none';
    
    gameLoopId = requestAnimationFrame(gameLoop);
}

function endGame() {
    isGameActive = false;
    cancelAnimationFrame(gameLoopId);
    startButton.textContent = 'Rejouer';
    startButton.style.display = 'block';
    
    const finalScore = Math.floor(gameInstance.score / 10);
    saveScore(finalScore);
}

// --- Initialisation ---

function init() {
    // 1. Initialisation de l'instance de jeu
    gameInstance = new Game(canvas);
    
    // 2. Récupération du meilleur score pour l'affichage initial
    getHighScore(); 
    
    // 3. Réinitialise l'affichage du score
    scoreDisplay.textContent = '0'; 
    
    // 4. Dessin de l'écran titre
    gameInstance.drawStaticElements(); 
    
    // 5. Affichage du bouton Démarrer
    startButton.style.display = 'block'; 
    startButton.textContent = 'Démarrer';
}

// Gestion des événements
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', (e) => {
    // Le joueur saute avec la barre d'espace
    if (e.code === 'Space' && isGameActive) {
        if (gameInstance) gameInstance.player.jump(); 
    }
});

window.onload = init;