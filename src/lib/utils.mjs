const dateOptions = {
  day: 'numeric',
  weekday: 'short',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Bangkok'
}

const dateTimeOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Bangkok'
}

export const d = (new Date()).toLocaleString('th-TH', dateTimeOptions)

export function formatDate(d) {
  return d.toLocaleString('th-TH', dateOptions)
}