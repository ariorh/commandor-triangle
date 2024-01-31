// main.js

// Подключение сцен
import BootScene from './BootScene.js';
import MainMenuScene from './MainMenuScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';

// Конфигурация игры
const config = {
    type: Phaser.AUTO,
    width: 1200, // Ширина холста
    height: 800, // Высота холста
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
