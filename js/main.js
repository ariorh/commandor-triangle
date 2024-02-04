// main.js

// Подключение сцен
import BootScene from './BootScene.js';
import MainMenuScene from './MainMenuScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';

// Конфигурация игры
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800, // базовая ширина, которая будет масштабироваться
    height: 600, // базовая высота, которая будет масштабироваться
    scale: {
        mode: Phaser.Scale.RESIZE, // Режим RESIZE автоматически изменяет размеры игры
        parent: 'game-container',
        width: '100%', // или window.innerWidth
        height: '100%' // или window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Нет гравитации в аркадной физике
            debug: false // Отладочные инструменты физики
        }
    },
    resolution: window.devicePixelRatio,
    scene: [BootScene, MainMenuScene, GameScene, GameOverScene] // Список сцен
};

// Создание новой игры
const game = new Phaser.Game(config);
