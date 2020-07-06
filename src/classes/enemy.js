import Phaser from "phaser";
import enemyInterceptor from "./enemyInterceptor";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
    }

    moveEnemyShip(enemyShip, speed) {
        enemyShip.y += speed;
        if(enemyShip.y > scene.game.config.height + 100) {
            this.resetShipPos(enemyShip);
        }
    }

    hitEnemy(projectile, enemy) {

        var explosion = new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        this.scoreLabel.text = "$" + this.score;
    }

    resetShipPos(ship) {
        ship.y = -100;
        var randomX = Phaser.Math.Between(-100, this.game.config.width);
        ship.x = randomX;
    }
}