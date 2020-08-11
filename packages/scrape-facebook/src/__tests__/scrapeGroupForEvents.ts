import scrapeGroupForEvents from "../scrapeGroupForEvents";

const TEST_GROUP_URL = "https://www.facebook.com/groups/1514852035419257/";

describe("@zoom-events/scrape-facebook-event/scrapeGroupForEvents", () => {
  it("should scrape a facebook event", async () => {
    jest.setTimeout(60 * 1000);
    const events = await scrapeGroupForEvents({
      url: TEST_GROUP_URL,
    });

    expect(events[0]).toContain("facebook.com/events/");
  });
});
