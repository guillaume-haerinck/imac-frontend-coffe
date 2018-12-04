import "./window.scss";
import template from "./window.ejs";
import { environment } from "../../../../environment.js";

export class Window extends HTMLElement {
    private _rightWindowId: string;
    private _wrongWindowId: string;
    private _rightAwnsers: Element[] = [];
    private _wrongAwnsers: Element[] = [];

    constructor() {
        // Always call super first in constructor
        super();

        if (this.hidden) {
            this.style.display = "none";
        }

        // Put the input content in the content div of the template
        const templateContainer = document.createElement("div");
        templateContainer.innerHTML = template(environment);
        templateContainer.getElementsByClassName("content")[0].innerHTML = this.innerHTML;
        this.innerHTML = templateContainer.innerHTML;
    }

    public connectedCallback() {
        this._rightWindowId = this.getAttribute("ifRight");
        this._wrongWindowId = this.getAttribute("ifWrong");
        const content = this.getElementsByClassName("content");
        for (const item of content[0].children) {
            if (item.hasAttribute("rightAwnser")) {
                this._rightAwnsers.push(item);
            }
            if (item.hasAttribute("wrongAwnser")) {
                this._wrongAwnsers.push(item);
            }
        }

        this._rightAwnsers.forEach((awnser: Element) => {
            awnser.addEventListener("click", (event: Event) => {
                console.log("right awnser clicked !");
                this.replaceWindow(this._rightWindowId);
            });
        });

        this._wrongAwnsers.forEach((awnser: Element) => {
            awnser.addEventListener("click", (event: Event) => {
                console.log("wrong awnser clicked !");
            });
        });
    }

    // public disconnectedCallback() {}

    // TODO remove event listenner
    private replaceWindow(destinationId: string) {
        const content = this.getElementsByClassName("content");
        for (const item of content[0].children) {
            item.removeEventListener("click", (event: Event) => {
                console.log("event listener removed");
            });
        }
        const destination = document.getElementById(destinationId);
        destination.hidden = false;
        destination.style.display = "grid";
        this.replaceWith(destination);
    }
}

customElements.define("app-window", Window);
