import moment from 'moment'
moment.locale("en-gb");
moment.updateLocale('en', {
    relativeTime : {
      future: "in %s",
      past:   "%s",
      s:  "now",
      m:  "1 min",
      mm: "%d min",
      h:  "1 hrs",
      hh: "%d hrs",
      d:  "1 day",
      dd: "%d days",
      M:  "a month",
      MM: "%d months",
      y:  "a year",
      yy: "%d years"
    },
    calendar : {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd D MMMM',
      sameElse: 'dddd D MMMM'
    }
})
export default moment
