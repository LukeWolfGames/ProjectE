import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        // background
        this.load.image("background", "../src/assets/background.png");
        
        // player's ship
        this.load.spritesheet("player", "../src/assets/player.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        
        // ships
        this.load.spritesheet("enemyInterceptor", "../src/assets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("enemyFighter", "../src/assets/ship2.png", {
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("enemyShuttle", "../src/assets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        });

        // explosion
        this.load.spritesheet("explosion", "../src/assets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        // power-up
        this.load.spritesheet("power-up", "../src/assets/power-up.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        // beam
        this.load.spritesheet("beam", "../src/assets/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // font
        this.load.bitmapFont("pixelFont", "../src/assets/font.png", "../src/assets/font.xml");
    }

    create() {
        console.log("bootGame scene loaded.");
        this.text = this.add.text(20, 20, "Loading game...");
        this.scene.start("Game");
    }
}