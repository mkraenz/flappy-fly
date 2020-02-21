import { Physics, Scene } from "phaser";
import { Image } from "../assets/keys";
import { gameConfig } from "../game-config";

const Cfg = {
    imgHeight: 139,
    imgWidth: 1025,
    speed: 100,
    yCollisionTolerance: 7
};

export class GroundTile extends Physics.Arcade.Image {
    constructor(scene: Scene, x: number) {
        super(scene, x, scene.scale.height - Cfg.imgHeight / 4, Image.Ground);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setMaxVelocity(Number.MAX_VALUE, 0)
        this.setOrigin(0, 0.5);
        this.setGravityY(-gameConfig.physics?.arcade?.gravity?.y!);
        this.setVelocityX(-Cfg.speed);
        this.setDepth(1);
        this.setSize(this.width, this.height - Cfg.yCollisionTolerance)
    }

    public update() {
        if (this.x < -this.scene.scale.width) {
            this.x = this.scene.scale.width;
        }
    }
}
