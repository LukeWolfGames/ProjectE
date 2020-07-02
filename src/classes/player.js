import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        
        // player expected set up
        this.scene = scene;
        this.setScale(2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.initAnim();
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

    movePlayerManager(cursorKeys) {
        if(this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        }
    
        if(this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        } else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        } else {
            this.player.setVelocityY(0);
        }
    }
}

