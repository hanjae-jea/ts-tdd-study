import { expect } from "chai";
import { JSDOM } from "jsdom";

export class AuctionSniperDriver {
  private dom: JSDOM;

  constructor(dom: JSDOM) {
    this.dom = dom;
  }
  public showsSniperStatus(statusText: string) {
    expect(
      this.dom.window.document.querySelector("#sniper-status")?.textContent
    ).eql(statusText);
  }
}
