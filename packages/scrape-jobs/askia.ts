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


