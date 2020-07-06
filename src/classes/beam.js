import Phaser from "phaser";

export default class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = scene.player.x - 2;
        var y = scene.player.y - 40;
        super(scene, x, y, "beam");

        scene.add.existing(this);
        this.scene = scene
        scene.physics.world.enableBody(this);
        this.setScale(2);
        this.body.velocity.y= -250;
        scene.projectiles.add(this);
        this.initAnim();
    }

    initAnim() {
        this.scene.anims.create({
            key: "beam_anim",
            frames: this.scene.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });
        this.play("beam_anim");
    }
    update() {
        
        if(this.y < -32) {
            this.destroy();
        }
    }
}