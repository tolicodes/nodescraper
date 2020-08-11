const electron = require("electron");

import login from "@zoomevents/scrape-facebook-event/dist/login";
import loadCookies from "@zoomevents/scrape-facebook-event/dist/loadCookies";
import scrapeGroupMemberships from "@zoomevents/scrape-facebook-event/dist/scrapeGroupMemberships";

import startGroupScraper from "./startGroupScraper";

import * as filePaths from "./filePaths";

const fs = require("fs");

const autoStart = () => {
  electron.app.setLoginItemSettings({
    openAtLogin: true,
    path: electron.app.getPath("exe"),
  });
};

// @ts-ignore
export default async (page) => {
  autoStart();
  const cookiesExist = !!loadCookies(page);

  console.log("cookiesExist", cookiesExist);
  if (!cookiesExist) {
    await login(page);
  }

  // const groupsPromise = scrapeGroupMemberships({
  //   saveToFile: filePaths.GROUPS,
  // });

  // const groupsInitiallyLoaded = fs.existsSync(filePaths.GROUPS);

  // if (!groupsInitiallyLoaded) {
  //   await page.goto("http://localhost:3000/loadingOptions");
  //   await groupsPromise;
  // }

  // await page.goto("http://localhost:3000/options");

  startGroupScraper();

  // if (groupsInitiallyLoaded) {
  //   await page.goto("http://localhost:3000/options");
  // }
};
