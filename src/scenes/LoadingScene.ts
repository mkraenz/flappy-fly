import { GameObjects, Scene } from "phaser";
import { Image, Sound } from "../assets/keys";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle } from "../styles/Text";
import { BgmScene } from "./BgmScene";

const sounds: Array<{ key: Sound; filename: string }> = [
    {
        key: Sound.Bgm,
        filename: "christmas-synths.mp3",
    },
    {
        key: Sound.Die,
        filename: "retro_die_03.mp3",
    },
    {
        key: Sound.Coin1,
        filename: "coin1.wav",
    },
    {
        key: Sound.Coin2,
        filename: "coin2.wav",
    },
    {
        key: Sound.Jump,
        filename: "jump.mp3",
    },
];

const images: Array<{ key: Image; filename: string }> = [
    {
        key: Image.Background,
        filename: "ocean-sky-background.png",
    },
    {
        key: Image.Ground,
        filename: "ground.png",
    },
    {
        key: Image.Pipe,
        filename: "pipe.png",
    },
];

export class LoadingScene extends Scene {
    private halfWidth!: number;
    private halfHeight!: number;

    constructor() {
        super({
            key: "LoadingScene",
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
            this.scene.add("BgmScene", BgmScene, true);
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
        const imageDir = "./assets/images/";
        images.forEach(image =>
            this.load.image(image.key, `${imageDir}${image.filename}`)
        );
        this.load.spritesheet(
            Image.Player,
            `${imageDir}/flappy-fly.sprite.png`,
            {
                frameWidth: 786 / 3,
                frameHeight: 218,
            }
        );
        const soundsDir = "./assets/sounds/";
        sounds.forEach(sound =>
            this.load.audio(sound.key, `${soundsDir}${sound.filename}`)
        );
    }

    private addTitles() {
        const title = this.add
            .text(this.halfWidth, this.halfHeight - 200, "Flappy Fly")
            .setOrigin(0.5);
        setDefaultTextStyle(title);
        title.setFontSize(112);
        title.setColor(Color.White);

        const subtitle = this.add
            .text(this.halfWidth, this.halfHeight - 100, "by Mirco Kraenz")
            .setOrigin(0.5);
        setDefaultTextStyle(subtitle);
        subtitle.setColor(Color.White);
    }
}
