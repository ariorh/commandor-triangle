// EnemyType2.js
import Enemy from './Enemy.js';

export default class EnemyType2 extends Enemy {
    constructor(scene, x, y, playerX, playerY) {
        super(scene, x, y, 'enemy2', 1, 1, 400); //scene, x, y, texture, health, damage, speed
        this.setScale(0.1);


        // Установка начальной скорости в направлении игрока
        const angle = Phaser.Math.Angle.Between(x, y, playerX, playerY);
        this.body.setVelocity(
            Math.cos(angle) * this.speed,
            Math.sin(angle) * this.speed
        );
    }

    update() {
        if (this.x < 0 || this.x > 4000 || this.y < 0 || this.y > 4000) {
            console.log('destroyed2');
            this.destroy();
        }
    }
}