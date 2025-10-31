
// src/classes/Obstacle.js

const GROUND_ASSET_HEIGHT = 30; // Doit être cohérent avec Player.js et Game.js

export class Obstacle {
    constructor(canvasWidth, canvasHeight, initialSpeed) {
        this.gameSpeed = initialSpeed;
        this.groundY = canvasHeight - GROUND_ASSET_HEIGHT;
        
        const typeIndex = Math.floor(Math.random() * 3);

        switch (typeIndex) {
            case 0: // Petit Obstacle (Rocher)
                this.width = 35;
                this.height = 35;
                this.color = '#6C7A89'; // Gris
                break;
            case 1: // Grand Obstacle (Buisson)
                this.width = 60;
                this.height = 50;
                this.color = '#38761D'; // Vert foncé
                break;
            case 2: // Le Mouton
                this.width = 45;
                this.height = 40;
                this.color = '#EAF0F1'; // Blanc cassé
                break;
        }

        this.x = canvasWidth;
        this.y = this.groundY - this.height; 
    }

    draw(ctx) {
        ctx.fillStyle = this.color; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(newSpeed) {
        this.gameSpeed = newSpeed; 
        this.x -= this.gameSpeed;
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    getBounds() {
        const padding = 5; 
        return { 
            x: this.x + padding, 
            y: this.y + padding, 
            width: this.width - padding * 2, 
            height: this.height - padding * 2 
        };
    }
}