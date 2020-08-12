import getPage from '@nodescraper/scrape-utils/getPage';

const URL = 'https://asktia.com/company/#careers';

(async () => {
  await new Promise((resolve) => {
    (function (e, s) {
      e.src = s;
      e.onload = function () {
        jQuery.noConflict();
        resolve()
      };
      document.head.appendChild(e);
    })(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js')
  })

  const jobs = $('.company__jobs-single').map((i, job) => {
    console.log(job)
    const title = $(job).find('strong').text().trim();
    return {
      title,
      url: $(job).find('a').attr('href'),
      location: $(job).text().replace(title, '').trim()
    };
  }).get();

  console.log(jobs)
})()




import { promises as fs } from "fs";

const GROUPS_HOME = "https://www.facebook.com/groups/";

export type Job = {
  name: string;
  url: string;
};

export type TScrapeJobReturn = Job[];

export default async ({ saveToFile }): Promise<TScrapeJobReturn> => {


  const SEE_MORE_SELECTOR = "._2fvv a";

  while (true) {
    const success = await $evalSelectorAndText(
      page,
      SEE_MORE_SELECTOR,
      "See More",
      (el) => {
        el.click();
        return true;
      }
    );
    if (!success) break;
    // wait for results to load
    await sleep(2000);
  }

  const GROUP_SELECTOR = ".f4g9fmn2 a";

  const URL_PREPEND = "https://facebook.com";

  const groups = await page.$$eval(
    GROUP_SELECTOR,
    (els, URL_PREPEND) =>
      els.map((el) => ({
        name: el.textContent,
        url: `${URL_PREPEND}${el.getAttribute("href")}`,
      })),
    URL_PREPEND
  );

  browser.close();

  if (saveToFile) {
    await fs.writeFile(saveToFile, JSON.stringify(groups));
  }

  return groups;
};
