// Projectile.js

export default class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'projectile');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.05);    
        this.setActive(false);
        this.setVisible(false);

        // Свойства
        this.speed = 300;
        this.damage = 1;
    }

    fire(x, y, angle) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);

        // Установка скорости снаряда на основе угла
        this.scene.physics.velocityFromAngle(angle, this.speed, this.body.velocity);
    }

    update() {
        
        // Добавить логику для удаления снаряда, если он выходит за пределы экрана
        if (this.x < 0 || this.x > 4000 || this.y < 0 || this.y > 4000) {
            console.log('projectile destroyed')
            this.destroy();
        }
    }
}