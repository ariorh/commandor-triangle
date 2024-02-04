export default class ModalManager {
    constructor(scene) {
        this.scene = scene;
        this.modalElements = [];
    }

    showModal(content) {
        console.log(content);
        this.scene.physics.pause();
        this.scene.spawnEnemyType1Timer.paused = true;
        this.scene.spawnEnemyType2Timer.paused = true;
        this.scene.spawnBonusTimer.paused = true;
        this.scene.player.pauseShooting(); 
        // Определяем размеры и положение модального окна
        let { centerX, centerY } = this.scene.cameras.main;
        let modalWidth = 400;
        let modalHeight = 200;
        let buttonSize = 64; // Допустим, у нас квадратные кнопки с размером 64x64 пикселей

        // Создаем фон модального окна
        let background = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } })
            .setScrollFactor(0);

        background.fillRect(centerX - modalWidth / 2, centerY - modalHeight / 2, modalWidth, modalHeight);
        
        // Заголовок
        let titleText = this.scene.add.text(centerX, centerY - modalHeight / 2 + 20, content, {
            fontSize: '24px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5, 0).setScrollFactor(0);

        // Кнопки с изображениями улучшений
        let speedButton = this.scene.add.image(centerX - buttonSize * 1.5, centerY, 'speedImprovement')
            .setInteractive()
            .setScrollFactor(0)
            .setScale(5);
        let fireRateButton = this.scene.add.image(centerX + buttonSize * 1.5, centerY, 'fireRateImprovement')
            .setInteractive()
            .setScrollFactor(0)
            .setScale(5);

        // Текст под кнопками
        let speedText = this.scene.add.text(centerX - buttonSize * 1.5, centerY + buttonSize / 2 + 10, '+10% speed', {
            fontSize: '16px',
            color: '#fff'
        }).setOrigin(0.5, 0).setScrollFactor(0);

        let fireRateText = this.scene.add.text(centerX + buttonSize * 1.5, centerY + buttonSize / 2 + 10, '+10% fire rate', {
            fontSize: '16px',
            color: '#fff'
        }).setOrigin(0.5, 0).setScrollFactor(0);

        // Обработчики кликов на кнопках
        speedButton.on('pointerdown', () => {
            this.applyImprovement('speed');
        });

        fireRateButton.on('pointerdown', () => {
            this.applyImprovement('fireRate');
        });

        // Сохраняем элементы для последующего удаления
        this.modalElements.push(background, titleText, speedButton, fireRateButton, speedText, fireRateText);
    }

    applyImprovement(type) {
        // Применяем улучшение в зависимости от типа
        if (type === 'speed') {
            this.scene.player.increaseSpeed(10);
            console.log('+10% speed choosen');
        } else if (type === 'fireRate') {
            this.scene.player.increaseFireRate(10);
            console.log('+10% fire rate choosen');
        }
        this.closeModal(); // Закрываем модальное окно после выбора
    }

    closeModal() {
        this.modalElements.forEach(element => element.destroy()); // уничтожение элементов модального окна
        this.modalElements = []; // очистка массива 
        this.scene.physics.resume(); // возобновление физики
        // запуск таймеров и стрельбы
        this.scene.spawnEnemyType1Timer.paused = false; 
        this.scene.spawnEnemyType2Timer.paused = false;
        this.scene.spawnBonusTimer.paused = false;
        this.scene.player.resumeShooting(); 
    }
}
