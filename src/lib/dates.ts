export const formatDate = date => {
  if (!date) {
    return ''
  }

  if (typeof date === 'string' && date.toLowerCase() === 'present') {
    return 'Present'
  }

  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
  })
}

export const dateToYears = (start, end) => {
  const today = end || new Date().toString()
  const difference = Date.parse(today) - Date.parse(start)
  return Math.floor(difference / 31536000000).toString()
}

export const replaceYearsExperience = (str, endDate = 'September 08, 2008') =>
  str.replace('#years_experience#', dateToYears(endDate, ''))
