import { Input, Scene } from "phaser";
import { Background } from "../components/Background";
import { GameState } from "../components/GameState";
import { Ground } from "../components/Ground";
import { Pipes } from "../components/Pipes";
import { Player } from "../components/Player";
import { Score } from "../components/Score";

export class MainScene extends Scene {
    private ground!: Ground;
    private background!: Background;
    private pipes!: Pipes;
    private player!: Player;
    private state: GameState = GameState.Start;
    private startKey!: Input.Keyboard.Key;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public create() {
        this.background = new Background(this);
        this.ground = new Ground(this);
        this.player = new Player(this);
        this.setStartInput();
    }

    public update() {
        this.ground.update();
        this.background.update();
        if (this.state === GameState.Playing) {
            this.pipes.update();
        }
    }

    private setStartInput() {
        const onStartInput = () => this.play(this.player);
        this.input.on("pointerup", onStartInput);
        this.startKey = this.input.keyboard.addKey(
            Input.Keyboard.KeyCodes.SPACE
        );
        this.startKey.onDown = onStartInput;
    }

    private unsetStartInput() {
        this.input.removeAllListeners();
    }

    private play(player: Player) {
        this.state = GameState.Playing;
        this.unsetStartInput();
        player.setPlaying();

        const score = new Score(this);
        this.pipes = new Pipes(this, score);
        const collider = this.physics.add.collider(player, [
            ...this.pipes.getPipes(),
            this.ground,
        ]);
        collider.collideCallback = () => {
            this.restart();
        };
    }

    private restart() {
        this.scene.restart();
    }
}
