(async () => {
  await new Promise((resolve) => {
    (function (e, s) {
      e.src = s;
      e.onload = function () {
        //                 jQuery.noConflict();
        resolve()
      };
      document.head.appendChild(e);
    })(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js')
  })

  await fetch('https://momentjs.com/downloads/moment.min.js')
    .then(response => response.text())
    .then(text => eval(text));

  await $.getScript('https://unpkg.com/turndown/dist/turndown.js');

  const date = moment.utc($('.pageHead-pageTitleLabel time').text()).format('YYYY-MM-DD');

  let timeStart = $('.eventTimeDisplay-startDate-time').text();
  let [timeEnd, endPM, timeZone] = $('.eventTimeDisplay-endDate').text().replace(' to ', '').split(' ');
  timeEnd = `${timeEnd} ${endPM}`;

  timeStart = moment(`${date} ${timeStart} ${timeZone}`).format();
  timeEnd = moment(`${date} ${timeEnd} ${timeZone}`).format();

  const GOOGLE_TIME_FORMAT = 'YYYY-MM-DD h:mm a';

  const event = {
    title: $('.pageHead-headline').text(),
    timeStart,
    timeEnd,
    timeStartFormatted: moment(timeStart).format(GOOGLE_TIME_FORMAT),
    timeEndFormatted: moment(timeEnd).format(GOOGLE_TIME_FORMAT),
    recurrence: $('.eventTimeDisplay-recurrence.text--caption').text(),
    remote: $('.eventSideBar address').text().indexOf('Online event') === 0,
    cost: $('[data-e2e="event-footer--price-label"]').text(),
    url: window.location.href,
    host: $('.event-group-chunk .text--bold').text(),
    detailsHtml: $('.event-description').html(),
    details: $('.event-description').text()
  };

  const turndownService = new TurndownService()
  const markdown = turndownService.turndown(event.detailsHtml)

  console.log(`${event.title}\tImprov\t${event.remote}\t\t${event.timeStartFormatted}\t${event.timeEndFormatted}\t${!!event.recurrence}\t${event.recurrence}\t${event.url}\t\t${event.host}\t${event.cost}\t${event.detailsHtml}`);
})()


