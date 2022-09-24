import { FakeAuctionServer } from "./fakeAuctionServer";
import { JSDOM } from "jsdom";
import { AuctionSniperDriver } from "./auctionSniperDriver";
import { Main } from "../../src/sniper/main";

export class ApplicationRunner {
  private driver;
  private main;

  constructor() {
    const dom = new JSDOM();
    this.driver = new AuctionSniperDriver(dom);
    this.main = new Main(dom);
  }
  public startBiddingIn(auction: FakeAuctionServer) {
    this.main.joinAuction(auction.getItemId());

    this.driver.showsSniperStatus("joining");
  }
  public async showsSniperHasLostAuction() {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 100));
    await wait();
    this.driver.showsSniperStatus("lost");
  }

  public async hasShownSniperIsBidding() {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 100));
    await wait();
    this.driver.showsSniperStatus("bidding");
  }
  public stop() {
    this.main.stop();
  }
}
