import Enemy from "./Enemy";
import Player from "./Player";

export default class GameCore {
    game: Phaser.Game;
    scene: Phaser.Scene;
    Enemies: Enemy[];
    EnemyGroup: Phaser.GameObjects.Group;

    constructor(game: Phaser.Game, scene: Phaser.Scene) {
        this.game = game;
        this.scene = scene;
        this.Enemies = [];
    }

    initGame(scene: Phaser.Scene) {
        this.scene = scene;
        this.EnemyGroup = this.scene.add.group();
        this.scene.physics.add.collider(this.EnemyGroup, this.EnemyGroup);
    }

    update(player: Player) {
        this.Enemies.forEach((w) => w.update(player));
    }
}
