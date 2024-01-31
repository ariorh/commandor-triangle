// Enemy.js

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, health, damage, speed) {
        super(scene, x, y, texture);
        this.health = health;
        this.damage = damage;
        this.speed = speed;

        // Инициализация и добавление врага в сцену
        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    update() {
        // Общая логика обновления (если есть)
    }
}