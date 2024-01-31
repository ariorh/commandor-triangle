// BonusType3.js
import Bonus from './Bonus.js';

export default class BonusType3 extends Bonus {
    constructor(scene, x, y) {
        super(scene, x, y, 'bonus3');
        this.setScale(0.2);
    }

    applyBonus() {
        this.scene.player.increaseProjectileCount();

        // Создание иконки бонуса
        const icon = this.scene.add.image(10, 5, 'bonus3').setOrigin(0, 0);
        icon.setScale(0.1);

        // Создание текстового поля для таймера бонуса
        const timerText = this.scene.add.text(icon.displayWidth + 30, icon.displayHeight / 2, '', { fontSize: '10px', fill: '#fff' }).setOrigin(0.4, 0);

        // Создание фона
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x000000, 0.5); // Черный цвет с прозрачностью 50%
        graphics.fillRect(0, 0, 100, 25); // Здесь установите нужные размеры

        const bonusContainer = this.scene.add.container(0, 0, [graphics, icon, timerText]);
        this.scene.bonusIcons.add(bonusContainer);

        // Генерируем уникальный идентификатор для бонуса, кладем информацию в контейнер
        const bonusId = `bonus3-${Date.now()}`;
        this.scene.bonusTimers[bonusId] = { container: bonusContainer, endTime: this.scene.time.now + 10000 };

        const currentScene = this.scene; // костыль

        // Задержка, после которой количество снарядов вернется к исходному значению
        this.scene.time.delayedCall(10000, () => {
            if (currentScene.player) {
                currentScene.player.resetProjectileCount();
            }
            bonusContainer.destroy();
            delete currentScene.bonusTimers[bonusId];
        });
    
        this.destroy(); // Уничтожаем бонус после его использования
    }
}