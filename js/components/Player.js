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
        this.lives = 100; // Начальное количество жизней
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
    increaseSpeed(percent) {
        this.speed = this.speed + this.speed * percent / 100;
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

    increaseFireRate(percent) {
        this.shootDelay = this.shootDelay - this.shootDelay * percent / 100;
    
        // Обновление таймера стрельбы с новым интервалом
        this.shootTimer.remove();
        this.shootTimer = this.createShootTimer();
    }

    loseLife(damage) {
        this.lives -=damage;
        if (this.lives <= 0) {
            this.scene.events.emit('gameOver', this.score);
        }
    }

    increaseScore() {
        this.score++;
        if (this.score % 3 === 0) {
            // Вызов метода из GameScene для паузы игры и отображения улучшений
            this.scene.pauseGameForImprovement();
        }
    }

    increaseProjectileCount() {
        //this.originalProjectileCount = this.projectileCount; // Сохраняем исходное количество
        this.projectileCount += 2; // Предположим, что увеличиваем до 2
    }
    
    resetProjectileCount() {
        this.projectileCount -= 2; // Возвращаем к исходному значению
    }

    increaseLives(amount) {
        this.lives += amount;
    }

    pauseShooting() {
        if (this.shootTimer) {
            this.shootTimer.paused = true; // Поставить таймер стрельбы на паузу
        }
    }
    
    resumeShooting() {
        if (this.shootTimer) {
            this.shootTimer.paused = false; // Возобновить таймер стрельбы
        }
    }
    
}


