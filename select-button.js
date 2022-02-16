/**
 *  Author: Akira Kashihara <akira.kashihara@hotmail.com>
 *  Date: 14th Feb. 2022
 */


class SelectButton extends HTMLElement {

    constructor() {

        super();
        const shadow = this.attachShadow({ mode: "open" }); 
        const button = document.createElement("button");
        const style = document.createElement("style");
        button.textContent = this.textContent;
        button.setAttribute("class", "button-class")
        button.setAttribute("id", "button-id")

        style.textContent = `
        .button-class {
            padding: 10px;
            font-size: 15px;
            font-weight: bold;        
            font-family: Arial, Helvetica, Sans-Serif;
        }
        :host {
            margin: 10px;
        }
        `
        shadow.appendChild(button);
        shadow.appendChild(style);
    }

    static get observedAttributes() {
        return [
            "background-color",
            "font-color",
        ]
    }

    attributeChangedCallback(attr, _, newVal) {
        console.log(attr, newVal);
        if (attr === "background-color") {
            this.shadowRoot.getElementById("button-id").style.background = newVal;
        } else if (attr === "font-color") {
            this.shadowRoot.getElementById("button-id").style.color = newVal;
        }
    }
}

customElements.define("select-button", SelectButton);