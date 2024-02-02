// BonusType1.js
import Bonus from './Bonus.js';

export default class BonusType1 extends Bonus {
    constructor(scene, x, y) {
        super(scene, x, y, 'bonus1', 'BonusType1');
        this.setScale(0.2);
    }

    applyBonus() {
        this.scene.player.increaseLives(2);
        this.destroy();
    }
}