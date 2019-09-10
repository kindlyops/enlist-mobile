import moment from 'moment'

export default function(date, format = 'MMM D, YYYY', relative = true) {
  let converted = moment(date)

  if (!converted.isValid()) return

  const diff = converted.diff(moment(), 'days')
  const hours = converted.format('h:mm a')

  if (relative && converted.isSame(moment(), 'day')) {
    return `Today, ${hours}`
  } else if (relative && converted.isSame(moment().subtract(1, 'day'), 'day')) {
    return `Yesterday, ${hours}`
  } else {
    return converted.format(format)
  }
}
