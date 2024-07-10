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
