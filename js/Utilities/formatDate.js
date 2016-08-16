/**
 * WIP
 */
export default function formatDate (date) {
  const delta = Math.round(( + new Date - date) / 1000)

  let formatedTime = 'now'
  let minutes = Math.round((delta / 60) % 60)
  let hours = Math.round(delta / 3600)

  if (hours > 24) {
    const days = Math.round(hours/24)
    formatedTime = days + ' day'
  } else if (hours >= 1) {
    formatedTime = hours + ' hrs'
  } else if (minutes > 0) {
    formatedTime = minutes + ' min'
  } else if (delta < 30) {
    formatedTime = delta + ' s'
  }
  return formatedTime.toUpperCase()
}
