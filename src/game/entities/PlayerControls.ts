export default class PlayerControls {
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: {
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
    };

    constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
        this.player = player;

        if (scene.input.keyboard) {
            // Initialize cursor keys
            this.cursors = scene.input.keyboard.createCursorKeys();

            // Initialize WASD keys
            this.wasd = {
                up: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.W,
                ),
                down: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.S,
                ),
                left: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.A,
                ),
                right: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.D,
                ),
            };
        }
    }

    update() {
        // Player Movement
        const cursors = this.cursors;
        const wasd = this.wasd;

        const isLeftPressed = cursors.left.isDown || wasd.left.isDown;
        const isRightPressed = cursors.right.isDown || wasd.right.isDown;
        const isUpPressed = cursors.up.isDown || wasd.up.isDown;
        const isDownPressed = cursors.down.isDown || wasd.down.isDown;

        if (isLeftPressed) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (isRightPressed) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
        }

        if (isUpPressed) {
            this.player.setVelocityY(-160);
            this.player.anims.play("turn", true);
        } else if (isDownPressed) {
            this.player.setVelocityY(160);
            this.player.anims.play("turn", true);
        } else {
            this.player.setVelocityY(0);
        }

        if (
            !isLeftPressed &&
            !isRightPressed &&
            !isUpPressed &&
            !isDownPressed
        ) {
            this.player.anims.play("turn");
        }
    }
}
