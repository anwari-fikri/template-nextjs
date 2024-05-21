import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { playerAnimations } from "../entities/CharAnims";
import PlayerControls from "../entities/PlayerControls";
import Enemy from "../entities/Enemy";
import EnemyGroup from "../entities/EnemyGroup";
import Game from "../entities/Game";
import Player from "../entities/Player";

export class MainGame extends Scene {
    player: Player;
    enemies: Enemy[];
    pools: EnemyGroup[];
    playerControls: PlayerControls;

    constructor() {
        super("Game");
        this.enemies = [];
        this.pools = [];
    }

    create() {
        Game.Core.initGame(this);
        this.player = new Player(this, 400, 400);
        this.playerControls = new PlayerControls(this, this.player);
        playerAnimations(this);

        for (let i = 0; i < 100; i++) {
            this.spawnEnemy();
        }

        EventBus.emit("current-scene-ready", this);
    }

    updateEnemyPools() {
        this.pools.forEach((pool) => {
            pool.enabled = false;
        });

        this.enemies.forEach(() => {
            const availablePool = this.pools.find((pool) => !pool.enabled);
            if (availablePool) {
                availablePool.enabled = true;
            } else {
                this.pools.push(new EnemyGroup(this));
            }
        });
    }

    spawnEnemy() {
        const availablePool = this.pools.find((pool) => !pool.enabled);
        if (availablePool) {
            availablePool.spawnAt(Math.random() * 800, Math.random() * 800);
            availablePool.enabled = true;
        } else {
            const newPool = new EnemyGroup(this);
            newPool.spawnAt(Math.random() * 500, Math.random() * 500);
            newPool.enabled = true;
            this.pools.push(newPool);
        }
    }

    update() {
        this.playerControls.update();
        this.updateEnemyPools();

        Game.Core.update(this.player);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
