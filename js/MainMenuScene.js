// MainMenuScene.js

import { DEFAULT_TEXT_STYLE } from './Styles.js';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#444444');
        // Отображаем название игры или любой другой текст
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Comandor Triangle', DEFAULT_TEXT_STYLE).setOrigin(0.5);

        // Добавляем кнопку для запуска игры
        const playButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Play', DEFAULT_TEXT_STYLE)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('GameScene'));

        // Центрируем элементы на экране
        this.cameras.main.centerOn(this.cameras.main.width / 2, this.cameras.main.height / 2);
    }
}
