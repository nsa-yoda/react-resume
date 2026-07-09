/* eslint-env node */
import fs from 'node:fs'
import path from 'node:path'
import { importJsonResume } from './lib/import-json-resume.mjs'

const inputPath = process.argv[2]

if (!inputPath) {
  console.error('Usage: node scripts/import-json-resume.mjs <json-resume-file>')
  process.exit(1)
}

const cwd = process.cwd()
const sourcePath = path.resolve(cwd, inputPath)
const outputPath = path.join(cwd, 'data', 'Resume.json')
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const document = importJsonResume(source)

fs.writeFileSync(outputPath, `${JSON.stringify(document, null, 2)}\n`, 'utf8')
console.log(
  `Imported ${path.relative(cwd, sourcePath)} into ${path.relative(cwd, outputPath)}`
)
