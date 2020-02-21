import { GameObjects, Scene } from "phaser";
import { Sound } from "../assets/keys";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";

const Cfg = {
    styles: TextConfig.md,
    color: Color.Grey,
    x: 50,
    y: 50,
};

const HIGHSCORE = "highscore";

export class Score extends GameObjects.Text {
    private score = 0;

    constructor(scene: Scene) {
        super(scene, Cfg.x, Cfg.y, "", {});
        scene.add.existing(this);
        this.setDepth(1);
        this.setStyle(Cfg.styles);
        this.setColor(Cfg.color);
        this.setPadding(0, 0, 10, 0); // fixes cut-off final letter
        this.draw();
    }

    public increase() {
        this.score++;
        this.draw();
        this.score % 5 === 0
            ? this.scene.sound.play(Sound.Coin1)
            : this.scene.sound.play(Sound.Coin2);
    }

    public save() {
        const highscore = this.loadHighscore();
        if (!highscore || highscore < this.score) {
            this.scene.registry.set(HIGHSCORE, this.score);
        }
    }

    public loadHighscore(): number | undefined {
        return this.scene.registry.get(HIGHSCORE);
    }

    private draw() {
        const highscore = this.loadHighscore();
        if (highscore) {
            this.setText(`Best: ${highscore}\nScore: ${this.score.toString()}`);
        } else {
            this.setText(`Score: ${this.score.toString()}`);
        }
    }
}
