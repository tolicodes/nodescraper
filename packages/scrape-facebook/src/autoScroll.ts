const SCROLL_TIMEOUT = 1000;
const SCROLL_DISTANCE = 1000;

export default async (page, times) => {
  await page.evaluate(
    ({ SCROLL_TIMEOUT, SCROLL_DISTANCE, times }) =>
      new Promise((resolve, reject) => {
        let timesScrolled = 0;

        const timer = setInterval(() => {
          window.scrollBy(0, SCROLL_DISTANCE);

          timesScrolled++;

          if (timesScrolled > times) {
            clearInterval(timer);
            resolve();
          }
        }, SCROLL_TIMEOUT);
      }),
    { SCROLL_TIMEOUT, SCROLL_DISTANCE, times }
  );
};
