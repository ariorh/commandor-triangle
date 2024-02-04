import Player from './components/Player.js';
import Projectile from './components/Projectile.js';
import Enemy from './components/Enemy.js';
import EnemyType1 from './components/EnemyType1.js';
import EnemyType2 from './components/EnemyType2.js';
import Bonus from './components/Bonus.js';
import BonusType1 from './components/BonusType1.js';
import BonusType2 from './components/BonusType2.js';
import BonusType3 from './components/BonusType3.js';
import ModalManager from './utils/ModalManager.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.modalElements = []; // Массив для хранения элементов модального окна
    }

    create() {
        this.projectiles = this.add.group({
            classType: Projectile,
            runChildUpdate: true // Это гарантирует, что метод update будет вызываться для каждого снаряда
        });
        
        this.modalManager = new ModalManager(this); // Создаем экземпляр менеджера модальных окон

        this.physics.world.setBounds(0, 0, 4000, 4000);
        const floor = this.add.tileSprite(0, 0, 4000, 4000, 'floor');
        floor.setOrigin(0, 0);

        // Создание игрока с использованием загруженного спрайта
        this.player = new Player(this, 2000, 2000, this.projectiles); // Передача группы снарядов в Player, надо разобраться

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 4000, 4000);

        // Создание текстовых элементов для жизней и очков
        const graphics = this.add.graphics().setScrollFactor(0);
        graphics.fillStyle(0x000000, 0.5); // Черный цвет с полупрозрачностью 50%
        graphics.fillRect(0, 0, 150, 55); // Размеры и положение подложки

        this.livesText = this.add.text(10, 10, 'Lives: 3', { fontSize: '16px', fill: '#fff' }).setScrollFactor(0);
        this.scoreText = this.add.text(10, 30, 'Score: 0', { fontSize: '16px', fill: '#fff' }).setScrollFactor(0);

        // Текстовые элементы справа
        this.bonusIcons = this.add.container(this.cameras.main.width - 70, 0).setScrollFactor(0);
        this.bonusTimers = {}; // Словарь для хранения текстовых полей таймеров бонусов
        this.activeBonuses = {};
        
        this.invulnerabilityEndTime = 0;

        // Таймер для EnemyType1
        this.spawnEnemyType1Timer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemyType1,
            callbackScope: this,
            loop: true
        });

        // Таймер для EnemyType2
        this.spawnEnemyType2Timer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemyType2,
            callbackScope: this,
            loop: true
        });

        
        this.bonuses = this.physics.add.group();

        // Таймер для создания бонусов
        this.spawnBonusTimer = this.time.addEvent({
            delay: 2000,
            callback: this.spawnBonus,
            callbackScope: this,
            loop: true
        });

        // Массивы для хранения врагов
        this.enemiesType1 = [];
        this.enemiesType2 = [];

        // Настройка обработки столкновений
        this.physics.add.overlap(this.player, this.enemiesType1, this.onPlayerEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.enemiesType2, this.onPlayerEnemyCollision, null, this);
        this.physics.add.overlap(this.projectiles, this.enemiesType1, this.onProjectileEnemyCollision, null, this);
        this.physics.add.overlap(this.projectiles, this.enemiesType2, this.onProjectileEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.bonuses, this.onPlayerBonusCollision, null, this);

        this.events.on('gameOver', (score) => {
            this.scene.start('GameOverScene', { score: score });
        });
    }

    update() {
        this.player.update();
        // Обновление врагов
        this.enemiesType1.forEach(enemy => enemy.update());
        this.enemiesType1.forEach((enemy, index) => {
            if (!enemy.active) {
                this.enemiesType1.splice(index, 1);
            } else {
                enemy.update();
            }
        });
        this.enemiesType2.forEach((enemy, index) => {
            if (!enemy.active) {
                this.enemiesType2.splice(index, 1);
            } else {
                enemy.update();
            }
        });

        // Обновление текстовых элементов
        this.livesText.setText('Lives: ' + this.player.lives);
        this.scoreText.setText('Score: ' + this.player.score);

        const now = this.time.now;

        // Обновление таймеров бонусов
        for (const key in this.bonusTimers) {
            const bonusTimer = this.bonusTimers[key];
            const timeLeft = Math.max(0, Math.ceil((bonusTimer.endTime - now) / 1000));
            bonusTimer.container.list[2].setText(`${timeLeft}s`); // Обновляем текст второго элемента контейнера (таймера)
        }
        // Обновление положения иконок и таймеров
        let yOffset = 0;
        this.bonusIcons.each(container => {
            container.setY(yOffset);
            yOffset += 25; // Увеличиваем yOffset на высоту контейнера и отступ
        });


    }
    
    spawnEnemyType1() {
        if (this.player.score > 1) {
            const playerX = this.player.x;
            const playerY = this.player.y;
        
            // Выбор случайной точки на заданном расстоянии от игрока
            const distance = Phaser.Math.Between(1000, 1500);
            const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
            const x = playerX + distance * Math.cos(angle);
            const y = playerY + distance * Math.sin(angle);
        
            // Создание врага
            const enemy = new EnemyType1(this, x, y);
            this.enemiesType1.push(enemy);
        }
    }
    
    spawnEnemyType2() {
        // Выбор случайной точки на границе карты (4000x4000)
        let x, y;
        const side = Phaser.Math.Between(0, 3);
        switch (side) {
            case 0: // Верх
                x = Phaser.Math.Between(0, 4000);
                y = 0;
                break;
            case 1: // Право
                x = 4000;
                y = Phaser.Math.Between(0, 4000);
                break;
            case 2: // Низ
                x = Phaser.Math.Between(0, 4000);
                y = 4000;
                break;
            case 3: // Лево
                x = 0;
                y = Phaser.Math.Between(0, 4000);
                break;
        }
    
        // Создание врага
        const enemy = new EnemyType2(this, x, y, this.player.x, this.player.y);
        this.enemiesType2.push(enemy);
    }

    spawnBonus() {
        const x = Phaser.Math.Between(1500, 2500); // Например, для поля 4000x4000
        const y = Phaser.Math.Between(1500, 2500);
        const bonusType = Phaser.Math.Between(0, 2); // Случайный выбор типа бонуса
    
        let bonus; // Объявление переменной здесь
        
        switch (bonusType) {
            case 0:
                bonus = new BonusType1(this, x, y);
                break;
            case 1: 
                bonus = new BonusType2(this, x, y);
                break;
            case 2:
                bonus = new BonusType3(this, x, y);
                break;
        }
    
        this.bonuses.add(bonus); // Теперь переменная bonus определена
    }

    onPlayerEnemyCollision(player, enemy) {    
        if (!player.invulnerable) {
            player.loseLife(enemy.damage);
        } else {
            player.increaseScore();
        }
        enemy.destroy();
    }
    
    onProjectileEnemyCollision(projectile, enemy) {
        projectile.destroy(); // Уничтожение снаряда
        enemy.takeDamage(projectile.damage); // Уничтожение врага
        this.player.increaseScore(); // Увеличение счета
    }

    onPlayerBonusCollision(player, bonus) {
        bonus.applyBonus();
    }

    getActiveBonusesText() {
        const now = this.time.now;
        let text = 'Active Bonuses:\n';
    
        for (const bonus in this.activeBonuses) {
            const timeLeft = Math.max(0, Math.ceil((this.activeBonuses[bonus] - now) / 1000));
            text += `${bonus}: ${timeLeft}s\n`;
        }
    
        return text;
    }

    pauseGameForImprovement() {
        this.modalManager.showModal("Choose improvment"); // Отображение  улучшений
    }
    
}
