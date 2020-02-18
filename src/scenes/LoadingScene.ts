import { GameObjects, Scene } from "phaser";
import { Image, Sound } from "../assets/keys";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle } from "../styles/Text";
import { MainScene } from "./MainScene";

export class LoadingScene extends Scene {
    private halfWidth!: number;
    private halfHeight!: number;

    constructor() {
        super({
            key: "Loading",
        });
    }

    public preload() {
        this.halfWidth = this.scale.width / 2;
        this.halfHeight = this.scale.height / 2;

        this.preloadAllAssets();
        this.addTitles();
        this.makeLoadingBar();
    }

    private makeLoadingBar() {
        const loadingText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight - 50,
            text: "Loading...",
            style: {
                font: "30px Arial",
                fill: Color.White,
            },
        });
        loadingText.setOrigin(0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(toHex(Color.DarkGrey), 0.8);
        progressBox.fillRect(
            this.halfWidth - 320 / 2,
            this.halfHeight,
            320,
            50
        );

        const assetText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight + 65,
            text: "",
            style: {
                font: "18px Arial",
                fill: Color.White,
            },
        });
        assetText.setOrigin(0.5);

        this.load.on("progress", this.getProgressBarFiller(progressBar));
        this.load.on("fileprogress", this.getAssetTextWriter(assetText));
        this.load.on("complete", () => {
            this.scene.add("MainScene", MainScene, true);
            this.scene.remove(this);
        });
    }

    private getAssetTextWriter(
        assetText: GameObjects.Text
    ): (file: { key: string }) => void {
        return (file: { key: string }) => {
            assetText.setText(`Loading asset: ${file.key}`);
        };
    }

    private getProgressBarFiller(
        progressBar: GameObjects.Graphics
    ): (count: number) => void {
        return (count: number) => {
            progressBar.clear();
            progressBar.fillStyle(toHex(Color.White));
            progressBar.fillRect(
                this.halfWidth + 10 - 320 / 2,
                this.halfHeight + 10,
                300 * count,
                30
            );
        };
    }

    private preloadAllAssets() {
        const imageDir = "./assets/images";
        this.load.image(Image.Ground, `${imageDir}/ground.png`);
        this.load.image(
            Image.Background,
            `${imageDir}/ocean-sky-background.png`
        );
        this.load.image(Image.Pipe, `${imageDir}/pipe.png`);
        this.load.spritesheet(Image.Player, `${imageDir}/fly.sprite.png`, {
            frameWidth: 508 / 2,
            frameHeight: 183,
        });
        const soundsDir = "./assets/sounds";
        this.load.audio(
            Sound.BallHitsFirstPlayer,
            `${soundsDir}/4390__noisecollector__a-flappy-bird-cloneblipf-4.wav`
        );
        this.load.audio(
            Sound.BallHitsSecondPlayer,
            `${soundsDir}/4391__noisecollector__a-flappy-bird-cloneblipf-5.wav`
        );
        this.load.audio(
            Sound.BallHitsWall,
            `${soundsDir}/4389__noisecollector__a-flappy-bird-cloneblipf-3.wav`
        );
        this.load.audio(
            Sound.Scored,
            `${soundsDir}/4365__noisecollector__a-flappy-bird-cloneblipa5.wav`
        );
    }

    private addTitles() {
        const title = this.add
            .text(this.halfWidth, this.halfHeight - 200, "A Flappy Bird Clone")
            .setOrigin(0.5);
        setDefaultTextStyle(title);
        title.setFontSize(112);
        title.setColor(Color.White);

        const subtitle = this.add
            .text(this.halfWidth, this.halfHeight - 120, "by Mirco Kraenz")
            .setOrigin(0.5);
        setDefaultTextStyle(subtitle);
        subtitle.setColor(Color.White);
    }
}
