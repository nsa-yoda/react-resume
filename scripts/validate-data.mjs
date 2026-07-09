/* eslint-env node */
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'
import { validateResumeDocument } from './lib/validate-resume-document.mjs'

const cwd = process.cwd()
const candidates = [
  path.join(cwd, 'data', 'Resume.json'),
  path.join(cwd, 'data', 'Resume.yaml'),
  path.join(cwd, 'data', 'Resume.yml'),
]

const sourcePath = candidates.find(candidate => fs.existsSync(candidate))

if (!sourcePath) {
  console.error(
    'No resume source found. Expected data/Resume.json or data/Resume.yaml'
  )
  process.exit(1)
}

const rawSource = fs.readFileSync(sourcePath, 'utf8')
const document = sourcePath.endsWith('.json')
  ? JSON.parse(rawSource)
  : parse(rawSource)
const errors = validateResumeDocument(document)

if (errors.length > 0) {
  console.error(`Validation failed for ${path.relative(cwd, sourcePath)}`)
  errors.forEach(error => {
    console.error(`- ${error.path}: ${error.message}`)
  })
  process.exit(1)
}

console.log(`Validated ${path.relative(cwd, sourcePath)} successfully`)
