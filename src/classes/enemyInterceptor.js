import Phaser from "phaser";
import Enemy from "./enemy.js";

export default class EnemyInterceptor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyInterceptor");
        // this.scene = scene;
        this.initAnim();
    }

    initAnim() {
        this.setScale(2);
        this.scene.anims.create({
            key: "enemyInterceptor_anim",
            frames: this.scene.anims.generateFrameNumbers("enemyInterceptor"),
            frameRate: 20,
            repeat: -1
        });
        this.play("enemyInterceptor_anim");
    }
}