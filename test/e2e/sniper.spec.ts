import { ApplicationRunner } from "./applicationRunner";
import { FakeAuctionServer } from "./fakeAuctionServer";

describe("auction sniper e2e test", () => {
  let auction: FakeAuctionServer;
  let application: ApplicationRunner;

  beforeEach(() => {
    auction = new FakeAuctionServer("item-54321");
    application = new ApplicationRunner();
  });

  it("sniper가 경매가 닫히기 전까지 경매에 참여한다", async () => {
    auction.startSellingItem();
    application.startBiddingIn(auction);
    await auction.hasReceivedJoinRequestFromSniper();
    auction.announceClosed();
    await application.showsSniperHasLostAuction();
  });

  it("경매 서버에서 가격 정보를 보내주고, sniper는 실제로 입찰해보지만 실패한다", async () => {
    auction.startSellingItem();
    application.startBiddingIn(auction);
    await auction.hasReceivedJoinRequestFromSniper();

    let increment = parseInt((Math.random() * 100).toFixed(0));
    await auction.announcePrice(1000, increment, "다른 사람");
    await application.hasShownSniperIsBidding(); // "joining", "lost", "bidding"
    await auction.hasReceivedBid(1000 + increment, "sniper");

    auction.announceClosed();
    await application.showsSniperHasLostAuction();
  });

  afterEach(() => {
    auction.stop();
    application.stop();
  });
});
