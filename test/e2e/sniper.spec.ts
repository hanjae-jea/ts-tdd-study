import { ApplicationRunner } from "./applicationRunner";
import { FakeAuctionServer } from "./fakeAuctionServer";

describe("auction sniper e2e test", () => {
  const auction = new FakeAuctionServer("item-54321");
  const application = new ApplicationRunner();
  it("sniper가 경매가 닫히기 전까지 경매에 참여한다", () => {
    auction.startSellingItem();
    application.startBiddingIn(auction);
    // auction.hasReceivedJoinRequestFromSniper();
    // auction.announceClosed();
    // application.showsSniperHasLostAuction();
  });
});
