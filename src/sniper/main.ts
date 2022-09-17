import { JSDOM } from "jsdom";

export class Main {
  private dom: JSDOM;
  constructor(dom: JSDOM) {
    this.dom = dom;
    const status = dom.window.document.createElement("div");
    status.id = "sniper-status";
    status.textContent = "joining";
    dom.window.document.body.appendChild(status);
  }
}
