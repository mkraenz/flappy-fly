import { Types } from "phaser";
import { LoadingScene } from "./scenes/LoadingScene";

export const gameConfig: Types.Core.GameConfig = {
    scene: LoadingScene,
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {
                y: 2000,
            },
        },
    },
    dom: {
        createContainer: true,
    },
    scale: {
        parent: "game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768,
    },
};
