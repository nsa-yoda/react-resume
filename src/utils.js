export const rand = () => {
  return Math.random().toString(36).slice(2, 7)
}

export const formatDate = date => {
  if (date === '') {
    return ''
  }
  if (date.toLowerCase() === 'present') {
    return 'Present'
  }
  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric', //"2-digit",
    month: 'short',
  })
}

export const dateToYears = (start, end) => {
  let today = end
  if (end === '') {
    today = new Date().toString()
  }
  const difference = Date.parse(today) - Date.parse(start)
  return Math.floor(difference / 31536000000).toString()
}

export const replaceYearsExperience = (str, end_date) => {
  end_date = end_date === undefined ? 'September 08, 2008' : end_date
  return str.replace('#years_experience#', dateToYears(end_date, ''))
}

/**
 * (More) Loosely validate a URL `string`.
 * A modified version of https://www.npmjs.com/package/is-url
 *
 * @param {String} string
 * @return {Boolean}
 */
export default function isUrl(string) {
  if (typeof string !== 'string') {
    return false
  }

  let protocolAndDomainRE =
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  let localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
  let nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/

  let match = string.match(protocolAndDomainRE)
  if (!match) {
    return false
  }

  let everythingAfterProtocol =
    match[0] === 'http' || match[0] === 'https' ? match[1] : match[0]
  if (!everythingAfterProtocol) {
    return false
  }

  return (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  )
}
