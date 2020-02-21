import { GameObjects, Scene } from "phaser";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";

const Cfg = {
    y: 255,
    title: "Click or hit Space",
    style: TextConfig.md,
};

export class ControlsDescription extends GameObjects.Text {
    constructor(scene: Scene) {
        super(
            scene,
            scene.scale.width / 2,
            scene.scale.height / 2 + Cfg.y,
            Cfg.title,
            {}
        );
        this.setStyle(Cfg.style);
        this.setOrigin(0.5);
        this.setColor(Color.Grey);
        this.setPadding(0, 0, 10, 0); // fixes cut-off final letter
        scene.add.existing(this);
        scene.tweens.add({
            targets: [this],
            scaleX: this.scaleX * 1.1,
            scaleY: this.scaleY * 1.1,
            ease: "Linear",
            repeat: -1, // -1: infinity
            yoyo: true,
            duration: 400,
        });
    }
}
