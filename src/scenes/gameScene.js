import Phaser from "phaser";
import Explosion from "../classes/explosion.js";
import Beam from "../classes/beam.js";
import Player from "../classes/player.js";

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

        // making the player flash
        this.flashDelay = 100;
        this.playerFlashCount = 0;
        this.playerFlashMax = 5;

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

        // // player's ship
        // this.player = this.physics.add.sprite(this.game.config.width / 2 - 8, this.game.config.height - 64, "player");
        // this.player.setScale(2);
        // this.anims.create({
        //     key: "thrust",
        //     frames: this.anims.generateFrameNumbers("player"),
        //     frameRate: 20,
        //     repeat: -1,
        // });
        // console.log(this.player);
        // this.player.play("thrust");
        // this.player.setCollideWorldBounds(true);

        // beam
        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });

        // enemy ships
        // ship1
        this.ship1 = this.add.sprite(this.game.config.width/2 - 150, this.game.config.height/2, "ship1");
        this.ship1.setScale(2);
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship1"),
            frameRate: 20,
            repeat: -1
        });
        this.ship1.play("ship1_anim");

        // ship2
        this.ship2 = this.add.sprite(this.game.config.width/2, this.game.config.height/2, "ship2");
        this.ship2.setScale(2);
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });
        this.ship2.play("ship2_anim");

        // ship3
        this.ship3 = this.add.sprite(this.game.config.width/2 + 150, this.game.config.height/2, "ship3");
        this.ship3.setScale(2);
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        });
        this.ship3.play("ship3_anim");

        // grouping enemy ships
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        // explosion effect
        this.explosion = this.add.sprite(-100, -100, "explosion");
        this.explosion.setScale(5);
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        // powerups
        // powerup animations
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
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        // score
        this.scoreLabel = this.add.bitmapText(this.game.config.width / 2, 5, "pixelFont", "$0", 16);
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
        this.moveShip(this.ship1, 3);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 1.5);
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


    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
    }

    moveShip(ship, speed) {
        ship.y += speed;
        if(ship.y > this.game.config.height + 100) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = -100;
        var randomX = Phaser.Math.Between(-100, this.game.config.width);
        ship.x = randomX;
    }


    hurtPlayer(player, enemy) {
        this.resetShipPos(enemy);
        // this.flashPlayer(player);

        if(this.player.alpha < 1) {
            return;
        }

        var explosion = new Explosion(this, player.x, player.y);

        player.disableBody(true, true);
        
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
    }

    flashPlayer(player) {

        if(this.playerFlashCount === this.playerFlashMax) {
            this.playerFlashCount = 0;
            return;
        } else {
            this.playerFlashCount++;
        }

        player.alpha = 0;
        this.time.addEvent({
            delay: this.flashDelay,
            callback: function() {
                player.alpha = 1;
                this.time.addEvent({
                    delay: this.flashDelay,
                    callback: function() {
                        this.flashPlayer(player);
                    },
                    callbackScope: this,
                    repeat: 0,
                });
            },
            callbackScope: this,
            repeat: 0,
        });
    }

    resetPlayer() {
        var x = this.game.config.width / 2 - 8;
        var y = this.game.config.height + 64;
        this.player.enableBody(true, x, y, true, true);

        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.player,
            y: this.game.config.height - 64,
            ease: "Power1",
            duration: 1500,
            repeat: 0,
            onComplete: function() {
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    hitEnemy(projectile, enemy) {

        var explosion = new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        this.scoreLabel.text = "$" + this.score;
    }
}