const puppeteer = require("puppeteer");

const fs = require("fs").promises;

const LOGIN_HOME = "https://www.facebook.com/";

type TLoginReturn = boolean;

export default async (page?: any): Promise<TLoginReturn> => {
  let browser;
  if (!page) {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  }

  await page.goto(LOGIN_HOME);

  // user is logged in
  await page.waitFor("._2s25", {
    timeout: 10 * 60 * 1000,
  });

  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

  browser && browser.close();

  return true;
};
