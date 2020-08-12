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

  await fetch('https://momentjs.com/downloads/moment.min.js')
    .then(response => response.text())
    .then(text => eval(text));

  const TIME_ZONE = 'EDT';


  $('.daygroup').each((i, group) => {
    const day = $(group).find('.dayname').text().trim();
    // Tue Aug 11th
    const dateFormat = 'ddd MMM Do'
    const date = moment(day, dateFormat).format('YYYY-MM-DD');

    $(group).find('.classitem').each((i, event) => {
      let start = $(event).find('.start').text();
      let end = $(event).find('.end').text();
      start = moment(`${date} ${start} ${TIME_ZONE}`);

      console.log(start.format())
    })
  });
})()


