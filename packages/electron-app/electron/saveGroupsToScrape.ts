import { promises as fs } from "fs";

const DATA_FILE = `${__dirname}/../../public/data/groupsToScrape.json`;

type TSaveGroupsToScrapeOpts = string[];

export default async (groups: TSaveGroupsToScrapeOpts) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(groups));
};
