import { GameObjects, Scene } from "phaser";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";

const Cfg = {
    y: 240,
    xIndent: 40,
    title: "Developed by Mirco Kraenz",
    style: TextConfig.md,
};

export class Subheader extends GameObjects.Text {
    constructor(scene: Scene) {
        super(scene, scene.scale.width / 2 + Cfg.xIndent, Cfg.y, Cfg.title, {});
        this.setStyle(Cfg.style);
        this.setFontSize(40);
        this.setOrigin(0.5);
        this.setColor(Color.Grey);
        this.setPadding(0, 0, 5, 0); // fixes cut-off final letter
        scene.add.existing(this);
    }
}
