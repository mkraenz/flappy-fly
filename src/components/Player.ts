import { Input, Physics, Scene } from "phaser";
import { Anims, Image, Sound } from "../assets/keys";
import { PlayerCfg } from "../config";
import { gameConfig } from "../game-config";

const Cfg = {
    imgScale: 0.3,
    maxVelocityY: 2000,
    flapForce: 700,
    x: PlayerCfg.x,
    bodySizeFactor: {
        x: 0.5,
        y: 2 / 3,
    },
    bodyOffset: {
        x: 80,
        y: 40,
    },
    dieOffsetY: 500,
};

export class Player extends Physics.Arcade.Sprite {
    public jump!: Input.Keyboard.Key;

    constructor(scene: Scene) {
        super(scene, Cfg.x, scene.scale.height / 2, Image.Player, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(Cfg.imgScale)
            .setMaxVelocity(0, Cfg.maxVelocityY)
            .setCollideWorldBounds();
        this.setGravityY(-gameConfig.physics?.arcade?.gravity?.y!)
        this.setSize(
            this.width * Cfg.bodySizeFactor.x,
            this.height * Cfg.bodySizeFactor.y
        );
        this.setOffset(Cfg.bodyOffset.x, Cfg.bodyOffset.y);
        this.setDepth(99);
        this.addAnims(scene);
        this.play(Anims.Fly);
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
        this.setCollideWorldBounds();
        this.enableInput();
        this.setGravityY(0);
        this.flap();
    }

    public update() {
        const angle = this.getAnimationAngle();
        this.setAngle(angle);
    }

    public die(finishedCb: () => void) {
        this.disableBody();
        this.anims.play(Anims.Die)
        setTimeout(() => {
            this.enableBody(false, this.x, this.y, true, true);
            this.setVelocityY(-1000);
            this.setCollideWorldBounds(false);
            const maybeFinish = () => {
                return this.y >
                    this.scene.scale.height +
                        this.displayHeight +
                        Cfg.dieOffsetY
                    ? finishedCb()
                    : setTimeout(maybeFinish, 20);
            };
            setTimeout(maybeFinish, 1000);
        }, 700);
    }

    private addAnims(scene: Scene) {
        scene.anims.create({
            key: Anims.Fly,
            frames: scene.anims.generateFrameNames(Image.Player,
                {
                    start: 0,
                    end: 1
                }),
            frameRate: 8,
            yoyo: true,
            repeat: -1,
        });
        scene.anims.create({
            key: Anims.Die,
            frames: scene.anims.generateFrameNames(Image.Player,
                {
                    start: 2,
                    end: 2
                }),
            frameRate: 8,
            yoyo: true,
            repeat: -1,
        });
    }

    private flap() {
        this.setVelocityY(this.body.velocity.y - Cfg.flapForce);
        this.scene.sound.play(Sound.Jump);
    }

    private getAnimationAngle() {
        const yVelocity = this.body.velocity.y;
        if (yVelocity > 250) {
            return 30;
        }
        if (yVelocity > 0) {
            return Math.floor((yVelocity / 250) * 30); // [0, 30]
        }
        if (yVelocity > -100) {
            return -Math.abs(Math.floor((yVelocity / 100) * 30)); // [-30, 0]
        }
        return -30;
    }
}
