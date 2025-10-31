// src/classes/Player.js

const GROUND_ASSET_HEIGHT = 30; // Hauteur du sol en pixels

export class Player {
    constructor(canvasHeight) {
        this.width = 50;
        this.height = 50;
        this.x = 50; 
        this.groundY = canvasHeight - GROUND_ASSET_HEIGHT; 
        this.y = this.groundY - this.height; 
        
        this.gravity = 1;
        this.velocity_y = 0;
        this.jumpVelocity = -18; 
        this.isJumping = false;
        this.isDead = false;
        
        this.color = '#FFA500'; // Couleur du joueur (Orange)
    }

    applyGravity() {
        this.velocity_y += this.gravity;
        this.y += this.velocity_y;

        if (this.y + this.height >= this.groundY) {
            this.y = this.groundY - this.height;
            this.velocity_y = 0;
            this.isJumping = false;
        }
    }

    jump() {
        if (!this.isJumping && !this.isDead) {
            this.isJumping = true;
            this.velocity_y = this.jumpVelocity;
        }
    }

    update() {
        this.applyGravity(); 
    }

    draw(ctx) {
        ctx.fillStyle = this.isDead ? '#FF0000' : this.color; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
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