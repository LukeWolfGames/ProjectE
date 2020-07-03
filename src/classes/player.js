import Phaser from "phaser";
import Beam from "./beam.js"

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        
        // player expected set up
        this.scene = scene;
        this.playerSpeed = 200;
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
                this.scene.projectiles.add(beam);
            }
        }
    }
}