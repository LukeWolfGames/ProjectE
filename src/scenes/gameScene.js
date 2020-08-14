import Phaser from "phaser";
import Player from "../classes/player.js";
import Enemy from "../classes/enemy.js";
import Explosion from "../classes/explosion.js";
import EnemyInterceptor from "../classes/enemyInterceptor.js";
import EnemyFighter from "../classes/enemyFighter.js";
import EnemyShuttle from "../classes/enemyShuttle.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    init() {
        // initiating background position and speed
        this.backgroundSpeed = 1;
        this.backgroundResetY = -599;

        // player speed
        this.playerSpeed = 200;

        // explosion properties (tangible)
        this.explosionShipSizeWidth = 0;
        this.explosionShipSizeHeight = 0;

        // score
        this.score = 0;
    }

    create() {
        console.log("playGame scene loaded.");

        // background
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);
        this.background.displayWidth = this.game.config.width;
        this.background.displayHeight = this.game.config.height;
        
        // background2
        this.background2 = this.add.image(0, -600, "background");
        this.background2.setOrigin(0,0);
        this.background2.displayWidth = this.game.config.width;
        this.background2.displayHeight = this.game.config.height;

        // player input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // player's ship
        this.player = new Player(this, this.game.config.width / 2 - 8, this.game.config.height - 64, "player");

        // enemy ships
        // enemyInterceptor
        this.enemyInterceptor = new EnemyInterceptor(this, this.game.config.width/2 + 150, this.game.config.height/2)
        // enemyFighter
        this.enemyFighter = new EnemyFighter(this, this.game.config.width/2 - 150, this.game.config.height/2);
        
        // enemyShuttle
        this.enemyShuttle = new EnemyShuttle(this, this.game.config.width/2 - 150, this.game.config.height/2);
        
        // grouping enemy ships

        this.enemyGroup = new Enemy(this, this.game.config.width/2 - 150, this.game.config.height/2, [this.enemyInterceptor, this.enemyFighter, this.enemyShuttle]);
        
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1,
        });
        
        this.anims.create({
            key: "grey",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1,
        });

        // powerup group
        this.powerUps = this.physics.add.group();

        // powerup instances
        var maxObjects = 4;
        for (var i = 0; i <= maxObjects; i++) {
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, this.game.config.width, this.game.config.height);

            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("grey");
            }
    
            powerUp.setScale(1);
            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        // collisions
        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
            projectile.destroy()
        });
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this.player);
        this.physics.add.overlap(this.player, this.enemyGroup, this.player.hurtPlayer, null, this.player);
        this.physics.add.overlap(this.projectiles, this.enemyGroup, this.hitEnemy, null, this);

        // score
        this.scoreLabel = this.add.bitmapText(this.game.config.width / 2, 5, "pixelFont", "$0", 16);
        console.log(this.enemyInterceptor);
        console.log(this.enemyFighter);
        console.log(this.enemyShuttle);
    }

    update() {

        // moving background
        this.moveBackground(this.background, this.backgroundSpeed);
        this.moveBackground(this.background2, this.backgroundSpeed);

        for(var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        // moving ships
        this.enemyGroup.moveEnemyShip(this.enemyInterceptor, 3);
        this.enemyGroup.moveEnemyShip(this.enemyFighter, 2);
        this.enemyGroup.moveEnemyShip(this.enemyShuttle, 1.5);
    }

    moveBackground(background, backgroundSpeed) {
        
        background.y += backgroundSpeed;
        if(this.background.y > this.game.config.height) {
            this.background.y = this.backgroundResetY;
        }

        if(this.background2.y > this.game.config.height) {
            this.background2.y = this.backgroundResetY; 
        }
    }

    // moveShip(ship, speed) {
    //     ship.y += speed;
    //     if(ship.y > this.game.config.height + 100) {
    //         this.resetShipPos(ship);
    //     }
    // }

    resetShipPos(ship) {
        ship.y = -100;
        var randomX = Phaser.Math.Between(-100, this.game.config.width);
        ship.x = randomX;
    }

    hitEnemy(projectile, enemy) {

        var explosion = new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        this.scoreLabel.text = "$" + this.score;
    }
}