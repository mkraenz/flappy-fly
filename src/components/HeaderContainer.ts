import { Scene } from "phaser";
import { ControlsDescription } from "./ControlsDescription";
import { Header } from "./Header";
import { Subheader } from "./Subheader";

export class HeaderContainer {
    private header: Header;
    private subheader: Subheader;
    private controlsDescription: ControlsDescription;

    constructor(scene: Scene) {
        this.header = new Header(scene);
        this.subheader = new Subheader(scene);
        this.controlsDescription = new ControlsDescription(scene);
    }

    public setVisible(visible: boolean = true) {
        this.header.setVisible(visible);
        this.subheader.setVisible(visible);
        this.controlsDescription.setVisible(visible);
    }
}
