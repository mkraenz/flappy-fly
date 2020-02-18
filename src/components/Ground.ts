import { Physics, Scene } from "phaser";
import { Image } from "../assets/keys";
import { gameConfig } from "../game-config";

const Cfg = {
    imgHeight: 208,
    imgWidth: 3072,
    scale: 0.5,
    speed: 100,
};

export class Ground extends Physics.Arcade.Image {
    constructor(scene: Scene) {
        super(
            scene,
            scene.scale.width /2,
            scene.scale.height - Cfg.imgHeight * Cfg.scale /4,
            Image.Ground
        );
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(Cfg.scale)
        this.setGravityY(-gameConfig.physics?.arcade?.gravity?.y!);
        this.setVelocityX(-Cfg.speed);
    }

    public update() {
        // TODO needs rework
        if (this.x + Cfg.imgWidth * Cfg.scale / 2 < this.scene.scale.width) {
            this.x = this.scene.scale.width / 2;
        }
    }
}
