import { expect } from "chai";
import Redis from "ioredis";
import { JSDOM } from "jsdom";

export class Main {
  private dom: JSDOM;
  private itemId: string = "";

  private redisPublish;
  private redisSubscribe;
  private sniperStatus: HTMLDivElement | null = null;

  constructor(dom: JSDOM) {
    this.dom = dom;

    this.redisPublish = new Redis("127.0.0.1:6379");
    this.redisSubscribe = new Redis("127.0.0.1:6379");
  }

  public joinAuction(itemId: string) {
    this.itemId = itemId;
    this.redisPublish.publish(itemId, "hello");

    this.sniperStatus = this.dom.window.document.createElement("div");
    this.sniperStatus.id = "sniper-status";
    this.sniperStatus.textContent = "joining";
    this.dom.window.document.body.appendChild(this.sniperStatus);

    this.redisSubscribe.subscribe(itemId, () => {});
    this.redisSubscribe.on("message", (channel, message: string) => {
      if (message.startsWith("SERVER:CLOSE"))
        this.sniperStatus && (this.sniperStatus.textContent = "lost");
      if (message.startsWith("SERVER:PRICE")) {
        //`SERVER:PRICE;price:${price};increment:${increment};bidder:${bidder}`
        let price = parseInt(message.split(";")[1].split(":")[1]);
        let increment = parseInt(message.split(";")[2].split(":")[1]);

        this.redisPublish.publish(
          itemId,
          `AUCTION:BID;PRICE:${price + increment};BIDDER:sniper`
        );
        this.sniperStatus && (this.sniperStatus.textContent = "bidding");
      }
    });
  }

  public stop() {
    this.dom.window.close();
    this.redisPublish.disconnect();
    this.redisSubscribe.disconnect();
  }
}
