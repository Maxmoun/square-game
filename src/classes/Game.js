// src/classes/Game.js
import { Player } from './Player.js';
import { Obstacle } from './Obstacle.js';

const GROUND_ASSET_HEIGHT = 30; // Doit être cohérent

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.font = '24px sans-serif';
        this.GROUND_Y = this.canvas.height - GROUND_ASSET_HEIGHT; 

        this.score = 0;
        this.gameSpeed = 5;
        this.isGameOver = false;
        
        this.player = new Player(this.canvas.height);
        this.obstacles = [];

        this.obstacleSpawnTimer = 0; 
        this.spawnInterval = 120; 
    }

    reset() {
        this.score = 0;
        this.gameSpeed = 5;
        this.player = new Player(this.canvas.height); 
        this.obstacles = [];
        this.isGameOver = false;
        this.obstacleSpawnTimer = 0;
        this.spawnInterval = 120;
    }

    spawnObstacles() {
        this.obstacleSpawnTimer++;
        if (this.obstacleSpawnTimer >= this.spawnInterval) {
            this.obstacles.push(new Obstacle(this.canvas.width, this.canvas.height, this.gameSpeed));
            this.obstacleSpawnTimer = 0;
            this.spawnInterval = Math.floor(Math.random() * 80) + 120; 
        }
    }

    checkCollision() {
        const p = this.player;
        for (const o of this.obstacles) {
            const pBounds = p.getBounds();
            const oBounds = o.getBounds();

            const isColliding = (
                pBounds.x < oBounds.x + oBounds.width && 
                pBounds.x + pBounds.width > oBounds.x &&
                pBounds.y < oBounds.y + oBounds.height && 
                pBounds.y + pBounds.height > oBounds.y
            );

            if (isColliding) {
                p.isDead = true;
                this.isGameOver = true;
                return true;
            }
        }
        return false;
    }

    update() {
        if (this.isGameOver) return false;

        this.player.update();
        this.spawnObstacles(); 

        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.update(this.gameSpeed);
            return !obstacle.isOffScreen(); 
        });

        this.gameSpeed += 0.005; 
        this.score++;

        return !this.checkCollision();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGround() {
        this.ctx.fillStyle = '#A0522D'; // Sienna
        this.ctx.fillRect(0, this.GROUND_Y, this.canvas.width, GROUND_ASSET_HEIGHT);
    }

    drawStaticElements() {
        this.clearCanvas();
        this.drawGround();
        this.player.draw(this.ctx); 
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = '20px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Appuyez sur Démarrer (ou Espace) pour commencer", this.canvas.width / 2, this.canvas.height / 2);
    }

    draw() {
        this.clearCanvas();
        this.drawGround();
        
        this.obstacles.forEach(o => o.draw(this.ctx));
        this.player.draw(this.ctx);

        if (this.isGameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '48px sans-serif';
            this.ctx.fillText("JEU TERMINÉ", this.canvas.width / 2, this.canvas.height / 2);
        }
    }
}