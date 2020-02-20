import { GameObjects, Scene } from "phaser";
import { Image } from "../assets/keys";

const Cfg = {
    imgWidth: 3072,
    imgHeight: 1536,
    speed: 0.1,
};

export class Background extends GameObjects.Image {
    constructor(scene: Scene) {
        super(scene, 0, 0, Image.Background);
        scene.add.existing(this);
        this.setOrigin(0, 0);
        this.setScale(1, scene.scale.height / Cfg.imgHeight);
    }

    public update() {
        this.x -= Cfg.speed;
    }
}
