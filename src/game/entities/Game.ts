import GameCore from "./GameCore";

export default class Game extends Phaser.Game {
    static _core: GameCore;

    static get Core(): GameCore {
        return this._core;
    }

    static set Core(core: GameCore) {
        window.game = core;
        this._core = core;
    }
}
