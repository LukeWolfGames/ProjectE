import Phaser from "phaser";
import Enemy from "./enemy.js";

export default class EnemyFighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyFighter");
        // this.scene = scene;
        this.initAnim();
    }

    initAnim() {
        this.setScale(2);
        this.scene.anims.create({
            key: "enemyFighter_anim",
            frames: this.scene.anims.generateFrameNumbers("enemyFighter"),
            frameRate: 20,
            repeat: -1
        });
        this.play("enemyFighter_anim");
    }
}