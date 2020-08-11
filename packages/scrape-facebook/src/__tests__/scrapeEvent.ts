import scrape from "../scrapeEvent";

const TEST_EVENT = "https://www.facebook.com/events/213332729878339/";

describe("@zoom-events/scrape-facebook-event", () => {
  it("should scrape a facebook event", async () => {
    const event = await scrape({ url: TEST_EVENT });

    expect(event.source).toEqual("facebook");
    expect(event.sourceId).toEqual("213332729878339");
    expect(event.name).toEqual("Virtual Dating Workshop");
    expect(event.header_image).toEqual(
      "https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-9/90559493_2294000737559947_8542461313454964736_n.jpg?_nc_cat=108&_nc_sid=b386c4&_nc_ohc=lMQPkPP7eeEAX8w_x70&_nc_ht=scontent-syd2-1.xx&oh=85f022dac28fd72864849eeb4e1504e0&oe=5EAC1CA5"
    );
    expect(event.description).toContain("<span>Virtual Dating Workshop:");
    expect(event.date_start).toEqual("2020-03-27T16:30:00-07:00");
    expect(event.date_end).toEqual("2020-03-27T17:30:00-07:00");
    expect(event.creator).toEqual("Love Leaf Coaching");
    expect(event.creator_url).toEqual(
      "https://www.facebook.com/turninganewloveleaf/"
    );
    expect(event.rsvp_link).toEqual(
      "https://www.facebook.com/events/213332729878339/"
    );
    expect(event.slug).toEqual("213332729878339-virtual-dating-workshop");
    expect(event.zoom_link).toEqual("https://zoom.us/j/840345232");
  });
});
