import Phaser from "phaser";
import BootScene from "./scenes/bootScene.js";
import GameScene from "./scenes/gameScene.js";

const config = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [BootScene, GameScene],
  pixelArt: true,
  physics: {
      default: "arcade",
      arcade: {
          debug: false
      }
  }
}

const game = new Phaser.Game(config);