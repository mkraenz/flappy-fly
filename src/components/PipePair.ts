import { Pipecfg, PlayerCfg } from "../config";
import { Pipe } from "./Pipe";

export class PipePair {
    private hasScored = false;

    constructor(
        public top: Pipe,
        public bottom: Pipe,
        private score: { increase: () => void }
    ) {}

    public update() {
        if (this.top.x < -Pipecfg.imgWidth) {
            this.top.shiftRight();
            this.bottom.shiftRight();
            this.hasScored = false;
        }
        if (this.top.x < PlayerCfg.x && !this.hasScored) {
            this.score.increase();
            this.hasScored = true;
        }
    }
}
