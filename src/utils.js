import configData from './config.json'
import highlightWords from './data/Highlighter.json'

/**
 * Retrieves a value from the configuration data based on a given path.
 * If the value does not exist, it returns a default value.
 *
 * @param {string} path - The dot-separated path to the desired configuration value (e.g., "skills.title").
 * @param {*} defaultValue - The default value to return if the path does not exist in the configuration.
 * @returns {*} - The value from the configuration data if it exists, otherwise the default value.
 *
 * Example usage:
 * const skillsTitle = config('skills.title', 'Default Skills Title');
 * const skillsColumns = config('skills.columns', 3);
 *
 * The above examples will retrieve the values of 'title' and 'columns' from the 'skills' section
 * of the configuration data. If these values do not exist, 'Default Skills Title' and 3 will be returned,
 * respectively.
 *
 * The function works by:
 * 1. Splitting the path into an array of keys using the dot character as the delimiter.
 * 2. Iterating through the keys to traverse the nested configuration object.
 * 3. If at any point a key does not exist in the current level of the object, the default value is returned.
 * 4. If all keys exist, the final value is returned.
 */
export const config = (path, defaultValue) => {
  const keys = path.split('.')
  let result = configData

  for (let key of keys) {
    if (result[key] !== undefined) {
      result = result[key]
    } else {
      return defaultValue
    }
  }

  return result
}

/**
 * Highlights words in a given input string by wrapping them in <mark> tags.
 * The words to be highlighted are specified in the global `highlightWords` list.
 *
 * @param {string} input - The input string containing words to be potentially highlighted.
 * @returns {string} - The input string with specified words wrapped in <mark> tags.
 *
 * Example usage:
 * const highlightWords = ['important', 'highlight'];
 * const text = "This is an important message to highlight certain words.";
 * const highlightedText = Highlighter(text);
 *
 * The above example will return:
 * "This is an <mark>important</mark> message to <mark>highlight</mark> certain words."
 *
 * The function works by:
 * 1. Splitting the input string into an array of words based on whitespace characters.
 * 2. Iterating over each word and checking if it exists in the `highlightWords` list.
 * 3. Removing punctuation from the word for accurate matching.
 * 4. Wrapping the word in <mark> tags if it matches a word in the highlight list.
 * 5. Joining the array of words back into a single string with spaces.
 */
export const Highlighter = input => {
  let words = input.split(/\s+/)

  // Iterate over each word and wrap it in <mark> tags if it matches any word in the highlight list
  let highlightedWords = words.map(word => {
    // Remove punctuation from the word for accurate matching
    let cleanedWord = word.replace(/[.,!?;:()]/g, '')
    if (highlightWords.includes(cleanedWord.toLowerCase())) {
      return `<mark>${word}</mark>`
    }
    return word
  })

  return highlightedWords.join(' ')
}

/**
 * Generates a random string of 5 characters.
 *
 * @returns {string} - A random string consisting of 5 alphanumeric characters.
 *
 * Example usage:
 * const randomString = rand();
 * console.log(randomString); // Output: a random string like 'x8z5k'
 *
 * The function works by:
 * 1. Generating a random decimal number between 0 and 1.
 * 2. Converting this number to a base-36 string (which includes digits and lowercase letters).
 * 3. Removing the leading '0.' from the base-36 string representation.
 * 4. Extracting a substring of 5 characters from the generated string.
 */
export const rand = () => {
  return Math.random().toString(36).slice(2, 7)
}

/**
 * Formats a given date string into a more readable format.
 *
 * @param {string} date - The date string to be formatted. Can be an empty string or the word 'present'.
 * @returns {string} - A formatted date string in the format 'MMM YYYY', or 'Present' if the input is 'present'.
 *
 * Example usage:
 * const formattedDate1 = formatDate('2024-07-10');
 * console.log(formattedDate1); // Output: 'Jul 2024'
 *
 * const formattedDate2 = formatDate('present');
 * console.log(formattedDate2); // Output: 'Present'
 *
 * const formattedDate3 = formatDate('');
 * console.log(formattedDate3); // Output: ''
 *
 * The function works by:
 * 1. Checking if the input date is an empty string. If so, it returns an empty string.
 * 2. Checking if the input date is the string 'present' (case-insensitive). If so, it returns 'Present'.
 * 3. Converting the input date string to a Date object and formatting it to 'MMM YYYY' using `toLocaleDateString`.
 */
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

/**
 * Calculates the number of years between two dates.
 *
 * @param {string} start - The start date in a string format.
 * @param {string} end - The end date in a string format. If empty, the current date is used.
 * @returns {string} - The number of years between the start and end dates, rounded down to the nearest whole number.
 *
 * Example usage:
 * const yearsOfExperience = dateToYears('2010-01-01', '2024-07-10');
 * console.log(yearsOfExperience); // Output: '14'
 *
 * const yearsToPresent = dateToYears('2010-01-01', '');
 * console.log(yearsToPresent); // Output: the number of years from 2010-01-01 to the current date.
 *
 * The function works by:
 * 1. Checking if the end date is an empty string. If so, it sets the end date to the current date.
 * 2. Calculating the difference in milliseconds between the end date and the start date.
 * 3. Converting the difference from milliseconds to years (considering one year as 31536000000 milliseconds).
 * 4. Returning the number of years as a string, rounded down to the nearest whole number.
 */
export const dateToYears = (start, end) => {
  let today = end
  if (end === '') {
    today = new Date().toString()
  }
  const difference = Date.parse(today) - Date.parse(start)
  return Math.floor(difference / 31536000000).toString()
}

/**
 * Replaces the placeholder `#years_experience#` in a given string with the number of years of experience calculated from a given start date to the current date.
 *
 * @param {string} str - The input string containing the `#years_experience#` placeholder.
 * @param {string} [end_date='September 08, 2008'] - The start date for calculating years of experience. Defaults to 'September 08, 2008' if not provided.
 * @returns {string} - The input string with the `#years_experience#` placeholder replaced by the calculated number of years of experience.
 *
 * Example usage:
 * const jobDescription = "I have #years_experience# years of experience in software development.";
 * const updatedDescription = replaceYearsExperience(jobDescription, '2010-01-01');
 * console.log(updatedDescription); // Output: "I have 14 years of experience in software development." (assuming the current year is 2024)
 *
 * The function works by:
 * 1. Setting the `end_date` to a default value if it is not provided.
 * 2. Calculating the number of years of experience from the `end_date` to the current date using the `dateToYears` function.
 * 3. Replacing the `#years_experience#` placeholder in the input string with the calculated number of years.
 */
export const replaceYearsExperience = (str, end_date) => {
  end_date = end_date === undefined ? 'September 08, 2008' : end_date
  return str.replace('#years_experience#', dateToYears(end_date, ''))
}

/**
 * Checks if a given string is a valid URL.
 * A modified version of https://www.npmjs.com/package/is-url
 *
 * @param {string} string - The string to be checked.
 * @returns {boolean} - Returns true if the string is a valid URL, otherwise false.
 *
 * Example usage:
 * const validUrl = "https://www.example.com";
 * const invalidUrl = "not a url";
 * console.log(isUrl(validUrl)); // Output: true
 * console.log(isUrl(invalidUrl)); // Output: false
 *
 * The function works by:
 * 1. Checking if the input is a string. If not, it returns false.
 * 2. Using regular expressions to match the URL pattern:
 *    - `protocolAndDomainRE`: Matches the protocol (http/https) and domain name.
 *    - `localhostDomainRE`: Matches localhost URLs.
 *    - `nonLocalhostDomainRE`: Matches non-localhost domain names.
 * 3. Checking if the string matches the protocol and domain pattern. If not, it returns false.
 * 4. Extracting everything after the protocol (http/https) from the match.
 * 5. Verifying if the extracted part matches either the localhost or non-localhost domain patterns.
 * 6. Returning true if a match is found, otherwise false.
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
