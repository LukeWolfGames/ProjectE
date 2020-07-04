import Phaser from "phaser";
import Beam from "./beam.js";
import Explosion from "./explosion.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        
        // player expected set up
        // variables
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.playerSpeed = 200;
        this.playerFlashCount = 0;
        this.flashDelay = 100;
        this.playerFlashMax = 5;
        
        this.setScale(2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.initAnim();
        this.initControls();
        // Hook into the game's update event
        scene.events.on("update", this.update, this);
    }

    initAnim() {
        // animations for player
        this.scene.anims.create({
            key: "thrust",
            frames: this.scene.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1,
        });
        this.play("thrust");  
    }
    initControls() {
        // Track the arrow keys & OPQA
        const {
            LEFT,
            RIGHT,
            UP,
            DOWN,
            SPACE
        } = Phaser.Input.Keyboard.KeyCodes;
        this.cursorKeys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            space: SPACE
        });
    }
    
    update(time, delta) {
        if(this.cursorKeys.left.isDown) {
            this.setVelocityX(-this.playerSpeed);
        } else if(this.cursorKeys.right.isDown) {
            this.setVelocityX(this.playerSpeed);
        } else {
            this.setVelocityX(0);
        }
    
        if(this.cursorKeys.up.isDown) {
            this.setVelocityY(-this.playerSpeed);
        } else if(this.cursorKeys.down.isDown) {
            this.setVelocityY(this.playerSpeed);
        } else {
            this.setVelocityY(0);
        }

        // player firing
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.space)) {
            if(this.active) {
                let beam = new Beam(this.scene);
                console.log(this.scene.projectiles.countActive());
            }
        }
    }

    hurtPlayer(player, enemy) {
        this.scene.resetShipPos(enemy); //! IGNORE THIS FOR THE MOMENT
        this.flashPlayer(player); //TODO This needs to stay where it is until we introduce health system.

        if(this.alpha < 1) {
            return;
        }

        var explosion = new Explosion(this.scene, this.x, this.y);
        
        // this.setCollideWorldBounds(false);
        // this.disableBody(true, true);
        // this.scene.time.addEvent({
        //     delay: 1000,
        //     callback: this.resetPlayer,
        //     callbackScope: this,
        //     loop: false
        // });
    }

    resetPlayer() {
        var x = this.scene.game.config.width / 2 - 8;
        var y = this.scene.game.config.height + 256;
        
        this.enableBody(true, x, y, true, true);

        this.alpha = 0.5;

        this.scene.tweens.add({
            targets: this,
            y: this.scene.game.config.height - 64,
            ease: "Power1",
            duration: 1500,
            repeat: 0,
            onComplete: function() {
                this.alpha = 1;
                this.setCollideWorldBounds(true);
            },
            callbackScope: this
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
        this.scene.time.addEvent({
            delay: this.flashDelay,
            callback: function() {
                player.alpha = 1;
                this.scene.time.addEvent({
                    delay: this.flashDelay,
                    callback: function() {
                        this.flashPlayer(player);
                        console.log("PlayerFlashCount: " + this.playerFlashCount)
                    },
                    callbackScope: this,
                    repeat: 0,
                });
            },
            callbackScope: this,
            repeat: 0,
        });
    }

}