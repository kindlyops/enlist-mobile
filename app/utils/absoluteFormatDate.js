import moment from 'moment'

export default function(date, format = 'MMM D, YYYY', relative = true) {
  let converted = moment(date)

  if (relative && converted.isSame(moment(), 'day')) {
    return `Today`
  } else if (relative && converted.isSame(moment().subtract(1, 'day'), 'day')) {
    return `Yesterday`
  } else {
    return converted.format(format)
  }
}
