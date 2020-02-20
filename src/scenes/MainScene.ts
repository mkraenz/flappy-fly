import { Input, Scene } from "phaser";
import { Sound } from "../assets/keys";
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
    private key!: Input.Keyboard.Key;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public create() {
        this.background = new Background(this);
        this.ground = new Ground(this);
        this.player = new Player(this);
        this.setStartStateInput();
    }

    public update() {
        if (this.state === GameState.Stop) {
            return;
        }
        this.ground.update();
        this.background.update();
        if (this.state === GameState.Playing) {
            this.pipes.update();
            this.player.update();
        }
    }

    private setStartStateInput() {
        const play = () => this.play(this.player);
        this.setInput(play);
    }

    private setStopStateInput() {
        const restart = () => this.restart();
        this.setInput(restart);
    }

    private setInput(onInput: () => void) {
        this.input.on("pointerup", onInput);
        this.key = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
        this.key.onDown = onInput;
    }

    private unsetInput() {
        this.input.removeAllListeners();
    }

    private play(player: Player) {
        this.state = GameState.Playing;
        this.unsetInput();
        player.setPlaying();

        const score = new Score(this);
        this.pipes = new Pipes(this, score);
        const collider = this.physics.add.collider(player, [
            ...this.pipes.getPipes(),
            ...this.ground.getTiles(),
        ]);
        collider.collideCallback = () => {
            this.stop();
        };
    }

    private stop() {
        this.state = GameState.Stop;
        this.unsetInput();
        this.disablePhysics();
        this.setStopStateInput();
        this.sound.play(Sound.Die);
    }

    private disablePhysics() {
        const disableBody = (x: { disableBody: () => void }) => x.disableBody();
        disableBody(this.player);
        this.pipes.getPipes().map(disableBody);
        this.ground.getTiles().map(disableBody);
    }

    private restart() {
        this.state = GameState.Start;
        this.scene.restart();
    }
}
