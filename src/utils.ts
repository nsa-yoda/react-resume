import { config } from './lib/config'
import { highlightText } from './lib/content'
import { dateToYears, formatDate, replaceYearsExperience } from './lib/dates'
import isUrl from './lib/url'
import { resumeDocument } from './resume/document'

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
export { config, dateToYears, formatDate, replaceYearsExperience }

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
export const Highlighter = (input: string): React.ReactNode => {
  return highlightText(input, resumeDocument.highlights)
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
export const rand = (): string => {
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
export default isUrl
