import { expect } from "chai";
import Redis from "ioredis";

export class FakeAuctionServer {
  public itemId;
  private redisServer;
  private redisHost;
  constructor(itemId: string) {
    this.itemId = itemId;
    this.redisServer = new Redis();
    this.redisHost = new Redis();
  }
  public startSellingItem() {
    this.redisServer.publish(this.itemId, "SERVER:START;");
  }
  public async hasReceivedJoinRequestFromSniper() {
    const message = await this.redisHost.subscribe(this.itemId);
    expect(message).not.null;
  }
  public announceClosed() {
    this.redisServer.publish(this.itemId, "SERVER:CLOSE;");
  }
}
