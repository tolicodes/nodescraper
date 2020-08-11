const { promises: fs } = require("fs");

import * as filePaths from "./filePaths";
import scrapeGroupForEvents from "@zoomevents/scrape-facebook-event/dist/scrapeGroupForEvents";

// scrape every 6 hours
const SCRAPE_INTERVAL = 6 * 60 * 60 * 1000;
const TIME_BETWEEN_SCRAPES = 5 * 1000;

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const scrape = async () => {
  const groupsToScrape = JSON.parse(
    await fs.readFile(filePaths.GROUPS_TO_SCRAPE, "utf8")
  );

  let events = [];

  for (let i = 0; i < groupsToScrape.length; i++) {
    const group = groupsToScrape[i];
    events = [...(await scrapeGroupForEvents({ url: group }))];
    await sleep(TIME_BETWEEN_SCRAPES);
  }
};

export default () => {
  scrape();
  setInterval(scrape, SCRAPE_INTERVAL);
};
