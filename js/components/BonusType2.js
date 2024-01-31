// BonusType2.js
import Bonus from './Bonus.js';

export default class BonusType2 extends Bonus {
    constructor(scene, x, y) {
        super(scene, x, y, 'bonus2', 'BonusType2');
        this.setScale(0.2);

    }

    applyBonus() {
        const invulnerabilatyTime = 10000;
        const player = this.scene.player;
        const currentScene = this.scene; // Ссылка на текущую сцену
    
        player.invulnerable = true;
        player.setScale(0.4);
    
        const newEndTime = currentScene.time.now + invulnerabilatyTime;
        currentScene.invulnerabilityEndTime = Math.max(newEndTime, currentScene.invulnerabilityEndTime);
    
        const { container } = this.createBonusIcon('bonus2');
        const bonusId = `bonus2-${Date.now()}`;
        currentScene.bonusTimers[bonusId] = { container, endTime: currentScene.invulnerabilityEndTime };
    
        currentScene.time.delayedCall(invulnerabilatyTime, () => {
            if (currentScene.time.now >= currentScene.invulnerabilityEndTime) {
                player.invulnerable = false;
                player.setScale(0.25); // Восстановление исходного размера игрока
            }
            container.destroy();
            delete currentScene.bonusTimers[bonusId];
        });
    
        this.destroy();
    }
} 