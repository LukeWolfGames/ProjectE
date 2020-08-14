import Phaser from "phaser";
import EnemyInterceptor from "../classes/enemyInterceptor.js";
import EnemyFighter from "../classes/enemyFighter.js"
import EnemyShuttle from "../classes/enemyShuttle.js"

export default class Enemy extends Phaser.Physics.Arcade.Group {
    constructor(scene, world, x, y, children) {
        super(scene, x, y);
        this.scene = scene; 
        this.addMultiple(children, true)
        // this.createEnemyGroup(scene, children)
        
    }

    createEnemyGroup(scene, children) {
        children.forEach(enemy => {
            switch (enemy.texture.key) {
                case "enemyInterceptor":
                    break;
                case "EnemyFighter":
                    break;
                case "EnemyShuttle":
                default:
                    break;
            } 
            console.log(enemy);
            enemy = new EnemyInterceptor(scene, enemy.x, enemy.y);
        });
    }

    moveEnemyShip(enemyShip, speed) {
        enemyShip.y += speed;
        if(enemyShip.y > this.scene.game.config.height + 100) {
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
        var randomX = Phaser.Math.Between(-100, this.scene.game.config.width);
        ship.x = randomX;
    }
}