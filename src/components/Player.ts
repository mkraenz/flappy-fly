import { Input, Physics, Scene } from "phaser";
import { Image, Sound } from "../assets/keys";
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
        this.setDepth(99)
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
        this.setGravityY(0);
    }

    public update() {
        const angle = this.getAnimationAngle()
        this.setAngle(angle);
    }
    
    private flap() {
        this.setVelocityY(this.body.velocity.y - Cfg.flapForce);
        this.scene.sound.play(Sound.Jump)
    }
    
    private getAnimationAngle(){
        const yVelocity = this.body.velocity.y;
        if(yVelocity > 250){
            return 30;
        }
        if(yVelocity > 0) {
            return Math.floor(yVelocity / 250 * 30 ) // [0, 30]
        } 
        if(yVelocity > -100 ){
            return -Math.abs(Math.floor(yVelocity / 100 * 30)) // [-30, 0]
        }
        return -30
    }
}
