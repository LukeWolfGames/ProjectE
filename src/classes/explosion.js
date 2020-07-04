import Phaser from "phaser";

export default class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "explosion");
        
        // explosion expected set up
        this.scene = scene;
        scene.add.existing(this);
        this.setScale(5);
        this.initAnim();
    }

    // explosion effect
    initAnim() {
        this.scene.anims.create({
            key: "explode",
            frames: this.scene.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.play("explode");
    }
}