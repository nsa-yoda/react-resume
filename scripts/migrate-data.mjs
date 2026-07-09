/* eslint-env node */
import fs from 'node:fs'
import path from 'node:path'
import { stringify } from 'yaml'
import { createLegacyResumeDocument } from './lib/create-legacy-document.mjs'

const cwd = process.cwd()
const outputArg = process.argv[2] || 'json'
const outputPath =
  outputArg === 'yaml'
    ? path.join(cwd, 'data', 'Resume.yaml')
    : path.join(cwd, 'data', 'Resume.json')

try {
  const document = createLegacyResumeDocument(cwd)
  const content =
    outputArg === 'yaml'
      ? stringify(document)
      : `${JSON.stringify(document, null, 2)}\n`

  fs.writeFileSync(outputPath, content, 'utf8')
  console.log(`Wrote ${path.relative(cwd, outputPath)}`)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
