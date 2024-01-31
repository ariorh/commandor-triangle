// Player.js

import Projectile from './Projectile.js';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, projectilesGroup) {
        super(scene, x, y, 'player');
        
        // Инициализация
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.25);

        // Свойства
        this.speed = 200;
        this.shootDelay = 1000;
        this.lives = 3; // Начальное количество жизней
        this.score = 0; // Начальный счет очков
        this.projectileCount = 1; // Начальное количество выстрелов за раз
        this.invulnerable = false // По умолчанию нет неуязвимости

        // Установка границ мира для физического тела
        this.body.setCollideWorldBounds(true);

        // Управление
        this.cursors = scene.input.keyboard.createCursorKeys();

        // Создание таймера для стрельбы
        this.shootTimer = this.createShootTimer();

        this.projectiles = projectilesGroup; // Сохранение ссылки на группу снарядов

        this.scene = scene;
    }

    update() {
        // Логика управления
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        } else {
            this.body.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
        } else {
            this.body.setVelocityY(0);
        }

        // Вращение
        this.angle += 3; 

        
    }

    // Метод для изменения скорости игрока
    setSpeed(newSpeed) {
        this.speed = newSpeed;

        /* // Где-то можно сделать
        player.setSpeed(200); // Устанавливает новую скорость игрока */
    }

    shoot() {
        for (let i = 0; i < this.projectileCount; i++) { 
            let angle = Phaser.Math.Between(0, 360);
            let projectile = this.projectiles.get(this.x, this.y, 'projectile');
        
            if (projectile) {
                projectile.setActive(true).setVisible(true);
                projectile.fire(this.x, this.y, angle);
            }
        }
    }

    createShootTimer() {
        return this.scene.time.addEvent({
            delay: this.shootDelay,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        });
    }

    setShootDelay(newDelay) {
        this.shootDelay = newDelay;
    
        // Обновление таймера стрельбы с новым интервалом
        this.shootTimer.remove();
        this.shootTimer = this.createShootTimer();

            /* // Где-то в вашем коде, например, при сборе бонуса
            player.setShootDelay(500); // Устанавливает время между выстрелами в 500 мс */
    }

    loseLife(damage) {
        this.lives -=damage;
        if (this.lives <= 0) {
            this.scene.events.emit('gameOver', this.score);
        }
    }

    increaseScore() {
        this.score++;
    }

    increaseProjectileCount() {
        //this.originalProjectileCount = this.projectileCount; // Сохраняем исходное количество
        this.projectileCount += 2; // Предположим, что увеличиваем до 2
    }
    
    resetProjectileCount() {
        this.projectileCount -= 2; // Возвращаем к исходному значению
    }
}
