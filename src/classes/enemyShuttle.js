import Phaser from "phaser";
import Enemy from "./enemy.js";

export default class EnemyShuttle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyShuttle");
        // this.scene = scene;
        this.initAnim();
    }

    initAnim() {
        this.setScale(2);
        this.scene.anims.create({
            key: "enemyShuttle_anim",
            frames: this.scene.anims.generateFrameNumbers("enemyShuttle"),
            frameRate: 20,
            repeat: -1
        });
        this.play("enemyShuttle_anim");
    }
}