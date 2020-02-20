import { Scene } from "phaser";
import { GroundTile } from "./GroundTile";

export class Ground {
    private tile1: GroundTile;
    private tile2: GroundTile;

    constructor(scene: Scene) {
        this.tile1 = new GroundTile(scene, 0);
        this.tile2 = new GroundTile(scene, scene.scale.width);
    }

    public update() {
        this.tile1.update();
        this.tile2.update();
    }

    public getTiles() {
        return [this.tile1, this.tile2];
    }
}
