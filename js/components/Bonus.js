// Bonus.js

export default class Bonus extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, bonusType) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.bonusType = bonusType;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        
    }

    applyBonus() {
        // Специфическая логика будет определена в подклассах
    }

    createBonusIcon(iconKey) {
        // Создание иконки
        const icon = this.scene.add.image(10, 5, iconKey).setOrigin(0, 0);
        icon.setScale(0.1);

        // Создание текста
        const timerText = this.scene.add.text(icon.displayWidth + 30, icon.displayHeight / 2, '', { fontSize: '10px', fill: '#fff' }).setOrigin(0.4, 0);

        // Создание фона
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x000000, 0.5); // Черный цвет с прозрачностью 50%
        graphics.fillRect(0, 0, 100, 25); // Здесь установите нужные размеры

        const bonusContainer = this.scene.add.container(0, 0, [graphics, icon, timerText]);
        this.scene.bonusIcons.add(bonusContainer);

        return { container: bonusContainer, icon, text: timerText };
    }
}
