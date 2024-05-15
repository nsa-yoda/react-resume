module.exports = {
  useTabs: false, // Indent lines with tabs instead of spaces.
  printWidth: 80, // Specify the length of line that the printer will wrap on.
  tabWidth: 2, // Specify the number of spaces per indentation-level.
  singleQuote: true, // Use single quotes instead of double quotes.
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,

  /**
   * Print trailing commas wherever possible.
   * Valid options:
   *   - "none" - no trailing commas
   *   - "es5" - trailing commas where valid in ES5 (objects, arrays, etc)
   *   - "all" - trailing commas wherever possible (function arguments)
   */
  trailingComma: 'es5',

  /**
   * Specify which parse to use.
   * Valid options:
   *   - "flow"
   *   - "babylon"
   */
  parser: 'flow',

  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
}
