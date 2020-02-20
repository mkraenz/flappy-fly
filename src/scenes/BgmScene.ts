import { Scene } from "phaser";
import { Sound } from "../assets/keys";
import { MainScene } from "./MainScene";

export class BgmScene extends Scene {
    constructor() {
        super({
            key: "BgmScene",
        });
    }

    public create() {
        this.sound.play(Sound.Bgm, {
            loop: true,
            volume: 0.4,
        });
        this.scene.add("MainScene", MainScene, false);
        this.scene.start("MainScene");
    }
}
