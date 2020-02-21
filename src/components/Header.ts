import { GameObjects, Scene } from "phaser";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";

const Cfg = {
    y: 150,
    title: "Flappy Fly",
    style: TextConfig.lg,
};

export class Header extends GameObjects.Text {
    constructor(scene: Scene) {
        super(scene, scene.scale.width / 2, Cfg.y, Cfg.title, {});
        this.setStyle(Cfg.style);
        this.setOrigin(0.5);
        this.setColor(Color.Grey);
        this.setPadding(0, 0, 10, 0); // fixes cut-off final letter
        scene.add.existing(this);
    }
}
