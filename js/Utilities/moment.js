import moment from 'moment'
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
    }
})
export default moment
