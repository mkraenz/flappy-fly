import { GameObjects, Scene } from "phaser";
import { Sound } from "../assets/keys";
import { TextConfig } from "../styles/Text";

const Cfg = {
    styles: TextConfig.lg,
    x: 50,
    y: 50,
};

export class Score extends GameObjects.Text {
    private score = 0;

    constructor(scene: Scene) {
        super(scene, Cfg.x, Cfg.y, "", {});
        scene.add.existing(this);
        this.setDepth(1);
        this.setStyle(Cfg.styles);
        this.draw();
    }

    public increase() {
        this.score++;
        this.draw();
        this.score % 5 === 0
            ? this.scene.sound.play(Sound.Coin1)
            : this.scene.sound.play(Sound.Coin2);
    }

    private draw() {
        this.setText(this.score.toString());
    }
}
