const puppeteer = require("puppeteer");
const slugify = require("slugify");

import sleep from "./sleep";
import selectors from "./event-selectors.json";

// get rid of final / from url if it exists, split it by /, and get the last part (the id)
const getPageId = (url) => {
  const split = url.replace(/\/$/, "").split("/");
  return split[split.length - 1];
};

const getHeaderImage = async (page) => {
  page.click(selectors.header_image_link);
  await sleep(1000);
  return page.$eval(selectors.header_image, (el) => el.getAttribute("src"));
};

const getDate = async (page) => {
  const date = await page.$eval(selectors.date, (el) =>
    el.getAttribute("content")
  );

  return date.split(" to ");
};

const getZoomLink = async (page) => {
  const description = await page.$eval(
    selectors.description,
    (el) => el.innerHTML
  );
  const zoomLink = description.match(/https:\/\/zoom\.us\/j\/(\d+)/);
  return zoomLink && zoomLink[0];
};

type TScrapeFacebookEventOpts = {
  url: string;
};

type TScrapeFacebookEventReturn = {
  name: string;
  source: string;
  sourceId: string;
  header_image: string;
  description: string;
  date_start: string;
  date_end: string;
  creator: string;
  creator_url: string;
  rsvp_link: string;
  slug: string;
  zoom_link: string;
};

export default async ({
  url,
}: TScrapeFacebookEventOpts): Promise<TScrapeFacebookEventReturn> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const id = getPageId(url);

  const name = await page.$eval(selectors.name, (el) => el.textContent);

  const out = {
    name,
    source: "facebook",
    sourceId: id,
    header_image: await getHeaderImage(page),
    description: await page.$eval(selectors.description, (el) => el.innerHTML),
    date_start: (await getDate(page))[0],
    date_end: (await getDate(page))[1],
    creator: await page.$eval(selectors.creator, (el) => el.textContent),
    creator_url: await page.$eval(selectors.creator, (el) =>
      el.getAttribute("href")
    ),
    rsvp_link: url,
    slug: `${id}-${slugify(name, {
      lower: true,
    })}`,
    zoom_link: await getZoomLink(page),
  };

  await browser.close();
  return out;
};
