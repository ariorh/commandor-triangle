// import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Загрузка спрайта игрока
        this.load.image('player', 'assets/images/player.svg');
        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('projectile', 'assets/images/projectile.svg');
        this.load.image('enemy1', 'assets/images/enemy1.svg');
        this.load.image('enemy2', 'assets/images/enemy2.svg');
        this.load.image('bonus1', 'assets/images/bonus1.svg');
        this.load.image('bonus2', 'assets/images/bonus2.svg');
        this.load.image('bonus3', 'assets/images/bonus3.svg');



    }

    create() {
        this.scene.start('MainMenuScene'); // Переход к основной игровой сцене
    }
}
