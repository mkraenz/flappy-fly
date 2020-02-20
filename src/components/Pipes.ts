import { Physics, Scene } from "phaser";
import { Pipe } from "./Pipe";
import { PipePair } from "./PipePair";

const Cfg = {
    imgWidth: 64,
    imgHeight: 862,
    speed: 0.3,
    xOffset: 300,
    yOffset: 500,
    initialXOffset: 200,
};

interface IScore {
    increase: () => void;
}

export class Pipes {
    private pipePairs: PipePair[] = [];

    constructor(private scene: Scene, score: IScore) {
        this.addInitialPipes(score);
    }

    public update() {
        this.pipePairs.forEach(pair => pair.update());
    }

    public getPipes() {
        return this.pipePairs.reduce(
            (acc, pair) => [...acc, pair.top, pair.bottom],
            [] as Physics.Arcade.Image[]
        );
    }

    private addInitialPipes(score: IScore) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        for (let i = 0; i < width / Cfg.xOffset; i++) {
            const topY = (height / 2) * Math.sin(i);
            const x =
                this.scene.scale.width + Cfg.initialXOffset + i * Cfg.xOffset;
            const topPipe = new Pipe(this.scene, x, topY, true);
            const bottomPipe = new Pipe(this.scene, x, topY + Cfg.yOffset);
            this.pipePairs.push(new PipePair(topPipe, bottomPipe, score));
        }
    }
}
