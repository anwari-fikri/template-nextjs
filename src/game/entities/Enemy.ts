import EnemyGroup from "./EnemyGroup";
import Game from "./Game";
import GameCore from "./GameCore";
import Player from "./Player";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    target: Player;
    isDead: boolean;
    owner: null;
    _currentDirection: Phaser.Math.Vector2;
    FixedDirection: boolean;

    constructor(group: EnemyGroup, x: number, y: number) {
        super(group.scene, x, y, "dude");

        this.isDead = false;
        this._currentDirection = new Phaser.Math.Vector2(0, 0);
        this.FixedDirection = false;
        this.owner = null;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.Body.setCircle(10);
    }

    init() {}

    get Body() {
        return this.body as Phaser.Physics.Arcade.Body;
    }

    update(player: Player) {
        this.scene.physics.moveToObject(this, player);
        // if (this.isDead) return;
        // // this.setDepth(this.y - Game.Core.Player.y);

        // if (
        //     !this.FixedDirection ||
        //     (this.FixedDirection &&
        //         0 == this._currentDirection.x &&
        //         0 == this._currentDirection.y)
        // ) {
        //     this._currentDirection.x = player.x - this.x;
        //     this._currentDirection.y = player.y - this.y;
        //     this._currentDirection.normalize();
        // }

        // this.setFlipX(this._currentDirection.x > 0);
        // this.setVelocity(
        //     Math.random() * 100 * this._currentDirection.x * 1,
        //     Math.random() * 100 * this._currentDirection.y * 1,
        // );
    }

    setOwner(owner: any) {
        this.owner = owner;
    }

    onRecycle() {
        this.isDead = false;

        this.visible = true;
        this.setOrigin(0.5);
        this.setScale(1);
    }
}
