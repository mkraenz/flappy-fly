import { Input, Physics, Scene } from "phaser";
import { Image } from "../assets/keys";
import { PlayerCfg } from "../config";
import { gameConfig } from "../game-config";

const Cfg = {
    imgScale: 0.3,
    maxVelocityY: 2000,
    flapForce: 700,
    x: PlayerCfg.x,
};

export class Player extends Physics.Arcade.Sprite {
    public jump!: Input.Keyboard.Key;

    constructor(scene: Scene) {
        super(scene, Cfg.x, scene.scale.height / 2, Image.Player, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(Cfg.imgScale)
            .setMaxVelocity(0, Cfg.maxVelocityY)
            .setCollideWorldBounds()
        this.setGravityY(-gameConfig.physics?.arcade?.gravity?.y!)
    }

    public enableInput() {
        const onInput = () => this.flap();
        this.scene.input.on("pointerup", onInput);
        this.jump = this.scene.input.keyboard.addKey(
            Input.Keyboard.KeyCodes.SPACE
        );
        this.jump.onDown = onInput;
    }

    public setPlaying() {
        this.enableInput();
        this.setGravityY(0)
    }

    private flap() {
        this.setVelocityY(this.body.velocity.y - Cfg.flapForce);
    }
}
