const puppeteer = require("puppeteer");

export default async ({ url }) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  return {
    page,
    browser
  }
}