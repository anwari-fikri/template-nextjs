export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "dude");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
}
