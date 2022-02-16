/**
 *  Author: Akira Kashihara <akira.kashihara@hotmail.com>
 *  Date: 14th Feb. 2022
 */

class CookieConsentBanner extends HTMLElement {
    constructor() {
        super();    // Almays call it first in constructor
        const shadow = this.attachShadow({ mode: "open" });   // Shadow root
        const style = document.createElement("style");
        this.shadowRoot.innerHTML = `
        <slot name="description-consent"></slot>
        <slot name="button"></slot>
        `
        style.textContent = `
            slot[name = "description-consent"] {
                margin-bottom: 20px;
                display: block;
            }
            :host {
                background-color: #FFA726;
                display: block;
                margin: 0;
                font-family: Arial, Helvetica, Sans-Serif;
                padding: 20px;
                text-align: center;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            :host-context(.description-consent) {
                display: block;
            }
            `
        this.bannerPositionControler();
        shadow.appendChild(style)
    }

    static get observedAttributes() {
        return [
            "background-color",
            "font-color",
        ]
    }

    attributeChangedCallback(attr, _, newVal) {
        console.log(attr)
        if (attr === "background-color") {
            this.style.background = newVal;
        } else if (attr === "font-color") {
            this.style.color = newVal;
        }
    }

    // ページを動的にレンダリングするときは、うまく働かないことがあるので、この関数は別ファイルにする。
    bannerPositionControler = () => {
        window.onload = () => {
            const ccb = document.getElementsByTagName("cookie-consent-banner")[0];
            const footer = document.getElementsByTagName("footer")[0];
            if(document.body.clientHeight > window.innerHeight) {
                let positionHeight = document.body.clientHeight - window.innerHeight - document.documentElement.scrollTop;
                if (positionHeight < footer.offsetHeight) {
                    ccb.style.bottom = (footer.offsetHeight - positionHeight) + "px";
                }
            } else {
                ccb.style.bottom = window.innerHeight - (document.body.clientHeight - footer.clientHeight) + "px";
            }


            window.addEventListener("scroll", () => {
                let positionHeight = document.body.clientHeight - window.innerHeight - document.documentElement.scrollTop;
                if (positionHeight < footer.offsetHeight) {
                    ccb.style.bottom = (footer.offsetHeight - positionHeight) + "px";
                } else {
                    ccb.style.bottom = "0px";
                }
            })            
        }
    }

}

customElements.define("cookie-consent-banner", CookieConsentBanner);