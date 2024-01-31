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

    
}
