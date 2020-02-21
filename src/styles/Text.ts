import { GameObjects } from "phaser";
import { Color } from "./Color";

export const TextConfig = {
    lg: {
        font: "120px The_Kids_Mraker",
        fill: "#000000",
    },
    md: {
        font: "60px The_Kids_Mraker",
        fill: "#000000",
    },
    debug: {
        font: "16px Courier",
        fill: "#00ff00",
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.md).setColor(Color.Grey);
