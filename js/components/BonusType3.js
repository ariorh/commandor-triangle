// BonusType3.js
import Bonus from './Bonus.js';

export default class BonusType3 extends Bonus {
    constructor(scene, x, y) {
        super(scene, x, y, 'bonus3');
        this.setScale(0.2);
    }

    applyBonus() {
        this.scene.player.increaseProjectileCount();

        const { container, text } = this.createBonusIcon('bonus3');
        const bonusId = `bonus3-${Date.now()}`;
        this.scene.bonusTimers[bonusId] = { container, endTime: this.scene.time.now + 10000 };

        const currentScene = this.scene; // костыль

        // Задержка, после которой количество снарядов вернется к исходному значению
        this.scene.time.delayedCall(10000, () => {
            if (currentScene.player) {
                currentScene.player.resetProjectileCount();
            }
            container.destroy();
            delete currentScene.bonusTimers[bonusId];
        });
    
        this.destroy(); // Уничтожаем бонус после его использования
    }
}