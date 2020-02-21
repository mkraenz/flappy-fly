import { Scene } from "phaser";
import { Header } from "./Header";
import { Subheader } from "./Subheader";

export class HeaderContainer {
    private header: Header;
    private subheader: Subheader;

    constructor(scene: Scene) {
        this.header = new Header(scene);
        this.subheader = new Subheader(scene);
    }

    public setVisible(visible: boolean = true) {
        this.header.setVisible(visible);
        this.subheader.setVisible(visible);
    }
}
