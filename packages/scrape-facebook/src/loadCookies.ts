const fs = require("fs").promises;

export default async (page) => {
  try {
    const cookiesString = await fs.readFile("./cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);
    return cookies;
  } catch (e) {
    return false;
  }
};
