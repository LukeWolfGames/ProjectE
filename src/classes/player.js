import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")

        // player configurations
        this.scene = scene;
        this.setScale(2);
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // animations for player
        scene.anims.create({
            key: "thrust",
            frames: scene.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1,
        });
        this.play("thrust");
    }
    
    // initPhysics(player) {
    //     this.scene.physics.add.existing(player);
    //     this.setCollideWorldBounds(true);
    // }

    initAnim() {
        // this.scene.anims.create({
        //   key: "thrust",
        //   frames: this.scene.anims.generateFrameNumbers("player"),
        //   frameRate: 20,
        //   repeat: -1,
        // });
    }

}