import Enemy from "./Enemy";
import Game from "./Game";

export default class EnemyGroup extends Phaser.GameObjects.Group {
    stored: Enemy[];
    spawned: Enemy[];
    enabled: boolean;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.stored = [];
        this.spawned = [];
        this.enabled = true;
    }

    spawnAt(x: number, y: number, owner?: any) {
        const enemy = this.spawn();
        enemy.setPosition(x, y);
        enemy.setOwner(owner);
        this.enabled = true;
        return enemy;
    }

    spawn() {
        let enemy = this.stored.pop();
        if (!enemy) {
            enemy = this.make();
            enemy.init();
        }
        this.scene.children.add(enemy);
        enemy.onRecycle();
        this.add(enemy, true);
        this.spawned.push(enemy);
        Game.Core.Enemies.push(enemy);
        Game.Core.EnemyGroup.add(enemy, false);
        return enemy;
    }

    recycle(enemy: Enemy) {
        this.scene.children.remove(enemy);
        this.remove(enemy, true, false);
        this.spawned.splice(this.spawned.indexOf(enemy), 1);
        const index = Game.Core.Enemies.indexOf(enemy);
        if (index > -1) {
            Game.Core.Enemies.splice(index, 1);
            Game.Core.EnemyGroup.remove(enemy, false);
            this.stored.push(enemy);
            if (enemy.owner) {
                // enemy.owner.OnDespawn(enemy)
            }
        }
    }

    make() {
        return new Enemy(this, 0, 0);
    }
}
