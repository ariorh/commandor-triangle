// EnemyType1.js
import Enemy from './Enemy.js';

export default class EnemyType1 extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy1', 1, 2, 150); //scene, x, y, texture, health, damage, speed
        this.setScale(0.1);
    }

    update() {
        // Проверка, не уничтожен ли объект и существует ли игрок
        if (!this.scene || !this.scene.player || this.scene.player.active === false) {
            return;
        }

        // Логика преследования игрока
        this.scene.physics.moveToObject(this, this.scene.player, this.speed);

        // Проверка выхода за пределы поля боя
        if (this.x < 0 || this.x > 4000 || this.y < 0 || this.y > 4000) {
            this.destroy();
        }
    }
}