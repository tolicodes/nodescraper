import login from "../login";

describe("@zoom-events/scrape-facebook-event/login", () => {
  it("should scrape a facebook event", async () => {
    jest.setTimeout(100 * 60 * 1000);
    const result = await login();
    expect(result).toBe(true);
  });
});
