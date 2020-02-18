import { Physics, Scene } from "phaser";
import { Image } from "../assets/keys";
import { Pipecfg } from "../config";
import { gameConfig } from "../game-config";

const Cfg = {
    speed: 100,
    imgWidth: Pipecfg.imgWidth,
    imgHeight: 862,
};

export class Pipe extends Physics.Arcade.Image {
    /** 
     * For flipped Pipes (pipes drawn on the top), y is the lower end of the pipe on the screen. 
     * For non-flipped pipes (pipes drawn on the bottom), y is the upper end. 
     */
    constructor(scene: Scene, x: number, y: number, flipped = false) {
        super(scene, x, y, Image.Pipe);
        if(flipped){
            this.setOrigin(0.5, 1)
        }
        else{
            this.setOrigin(0.5, 0)
        }
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setFlipY(flipped);
        this.setGravityY(-gameConfig.physics?.arcade?.gravity?.y!);
        this.setVelocityX(-Cfg.speed)
    }

    public shiftRight() {
        this.x = this.scene.scale.width + Cfg.imgWidth
    }
}
