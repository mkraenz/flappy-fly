import { Scene } from "phaser";
import { Background } from "../components/Background";
import { Ground } from "../components/Ground";
import { Pipes } from "../components/Pipes";
import { Player } from "../components/Player";
import { Score } from "../components/Score";

export class MainScene extends Scene {
    private ground!: Ground;
    private background!: Background;
    private pipes!: Pipes;
    private player!: Player;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public create() {
        this.background = new Background(this);
        this.ground = new Ground(this);
        const score = new Score(this);
        this.pipes = new Pipes(this, score);
        this.player = new Player(this);
        // TODO let ground and player collide + lose
        const collider = this.physics.add.collider(
            this.player,
            this.pipes.getPipes()
        );
        collider.collideCallback = () => {
            this.lose();
        };
        const collider2 = this.physics.add.collider(this.player, this.ground);
        collider2.collideCallback = () => {
            this.lose();
        };
    }

    public update() {
        this.ground.update();
        this.background.update();
        this.pipes.update();
    }

    private lose() {
        this.scene.restart();
    }
}
