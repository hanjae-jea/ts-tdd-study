import { FakeAuctionServer } from "./fakeAuctionServer";
import { JSDOM } from "jsdom";
import { AuctionSniperDriver } from "./auctionSniperDriver";
import { Main } from "../../src/sniper/main";

export class ApplicationRunner {
  private driver;
  constructor() {
    const dom = new JSDOM();
    this.driver = new AuctionSniperDriver(dom);
    const main = new Main(dom);
  }
  public startBiddingIn(auction: FakeAuctionServer) {
    this.driver.showsSniperStatus("joining");
  }
  public showsSniperHasLostAuction() {
    this.driver.showsSniperStatus("lost");
  }
  public stop() {
    this.driver.stop();
  }
}
