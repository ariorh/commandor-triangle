// GameOverScene.js
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data.score; // Получаем счет из предыдущей сцены
    }

    create() {
        this.cameras.main.setBackgroundColor('#555555');
        // Устанавливаем размеры мира для этой сцены
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
    
        // Центрируем камеру
        this.cameras.main.centerOn(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
    
        // Отображаем счет игрока
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, `Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // Добавляем кнопку для перезапуска игры
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Main menu', {
            fontSize: '32px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.restartGame());
    }
    
    
    restartGame() {
        this.scene.start('MainMenuScene'); // Перезапускаем игровую сцену
    }
}
