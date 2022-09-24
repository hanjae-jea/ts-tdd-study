import Redis from "ioredis";
import { JSDOM } from "jsdom";

export class Main {
  private dom: JSDOM;
  private itemId: string = "";

  private redisPublish;
  private redisSubscribe;

  constructor(dom: JSDOM) {
    this.dom = dom;

    this.redisPublish = new Redis("127.0.0.1:6379");
    this.redisSubscribe = new Redis("127.0.0.1:6379");
  }

  public joinAuction(itemId: string) {
    this.itemId = itemId;
    this.redisPublish.publish(itemId, "hello");

    const status = this.dom.window.document.createElement("div");
    status.id = "sniper-status";
    status.textContent = "joining";
    this.dom.window.document.body.appendChild(status);
  }
}
