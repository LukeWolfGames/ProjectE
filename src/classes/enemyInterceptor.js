import Phaser from "phaser";
import Enemy from "./enemy.js";

export default class EnemyInterceptor extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyInterceptor");
        // this.scene = scene;
    }
}