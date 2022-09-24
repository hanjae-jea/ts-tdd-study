import { expect } from "chai";
import Redis from "ioredis";

export class FakeAuctionServer {
  public itemId;
  private redisServer;
  private redisHost;

  private messageQueue: string[] = [];

  constructor(itemId: string) {
    this.itemId = itemId;
    this.redisServer = new Redis("127.0.0.1:6379"); // publish 용
    this.redisHost = new Redis("127.0.0.1:6379"); // subscribe 용
  }

  public getItemId() {
    return this.itemId;
  }

  public startSellingItem() {
    this.redisServer.publish(this.itemId, "SERVER:START;");

    this.redisHost.subscribe(this.itemId, () => {});
    this.redisHost.on("message", (channel: string, message: string) => {
      this.messageQueue.push(message);
    });
  }

  private async poll(retry: number) {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
    for (let i = 0; i < retry; i++) {
      await wait(); // 1초 기다리기.
      if (this.messageQueue.length) return this.messageQueue.pop();
    }
    return null;
  }

  public async hasReceivedJoinRequestFromSniper() {
    expect(await this.poll(5)).not.null;
  }

  public announceClosed() {
    this.redisServer.publish(this.itemId, "SERVER:CLOSE;");
  }

  public stop() {
    this.redisServer.disconnect();
    this.redisHost.disconnect();
  }
}
