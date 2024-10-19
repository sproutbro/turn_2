import GameScene from "./scene/GameScene.js";
import StartScene from "./scene/StartScene.js";
import MainMenuScene from "./scene/MainMenuScene.js";

const config = {
  type: Phaser.AUTO,
  width: 720,
  height: 1280,
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
