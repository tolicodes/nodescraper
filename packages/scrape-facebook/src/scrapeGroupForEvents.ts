const puppeteer = require("puppeteer");

import autoScroll from "./autoScroll";
import sleep from "./sleep";
import { $$evalSelectorAndText } from "./evalSelectorAndText";
import loadCookies from "./loadCookies";

const FACEBOOK_EVENT_URL_REGEX = /https:\/\/www\.facebook\.com\/events\/\d+\//g;

export type Event = string;

export type TScrapeGroupForEventsOpts = {
  url: string;
};

export type TScrapeGroupForEventsReturn = Event[];

export default async ({
  url,
}: TScrapeGroupForEventsOpts): Promise<TScrapeGroupForEventsReturn> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await loadCookies(page);

  await page.goto(url);

  await autoScroll(page, 10);

  const EVENT_POST_LINK = ".profileLink";

  const events = (
    await $$evalSelectorAndText(page, EVENT_POST_LINK, "event", (els) => {
      const URL_PREPEND = "https://www.facebook.com";

      return els.map((el) => `${URL_PREPEND}${el.getAttribute("href")}`);
    })
  ).map((event) => event.match(FACEBOOK_EVENT_URL_REGEX)[0]);

  const GROUP_SEARCH_SELECTOR = "._3_gi input";
  await page.type(GROUP_SEARCH_SELECTOR, `events${String.fromCharCode(13)}`);

  await sleep(5000);

  await autoScroll(page, 10);

  const text = await page.$eval("body", (el) => el.innerText);

  const matches = text.match(FACEBOOK_EVENT_URL_REGEX);

  browser.close();

  return [...matches, ...events];
};
