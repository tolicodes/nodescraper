import scrapeGroupMemberships from "../scrapeGroupMemberships";

describe("@zoom-events/scrape-facebook-event/scrapeGroupMemberships", () => {
  it("should scrape a facebook event", async () => {
    jest.setTimeout(60 * 1000);
    const groups = await scrapeGroupMemberships();

    expect(groups[0].name).toBeTruthy();
    expect(groups[0].url).toContain("facebook.com/groups/");
  });
});
