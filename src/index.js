import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import bootScene from "./scenes/bootScene.js";
import gameScene from "./scenes/gameScene.js"

//! This is my old one.
const config = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [bootScene, gameScene],
  pixelArt: true,
  physics: {
      default: "arcade",
      arcade: {
          debug: false
      }
  }
}

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
