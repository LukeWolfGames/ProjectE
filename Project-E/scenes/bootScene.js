class bootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        // background
        this.load.image("background", "assets/background.png");
        
        // player's ship
        this.load.spritesheet("player", "assets/player.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        
        // ships
        this.load.spritesheet("ship1", "assets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship2", "assets/ship2.png", {
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship3", "assets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        });

        // explosion
        this.load.spritesheet("explosion", "assets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        // power-up
        this.load.spritesheet("power-up", "assets/power-up.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        // beam
        this.load.spritesheet("beam", "assets/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // font
        this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
    }

    create() {
        console.log("bootGame scene loaded.");
        this.text = this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
    }
}