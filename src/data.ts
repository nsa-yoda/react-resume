/**
 * This file is used to export all the data from the data directory.
 * This is done to avoid importing all the separate data files in the *.jsx files.
 *
 * The data directory is symlinked from the project root.
 * This allows the data directory to be committed to the repository, and
 * the data directory to be accessed from the project root, while
 * still allowing the src directory to be updated without having
 * to overwrite the data directory.
 *
 * /react-resume     <project root>
 *     /src          <source directory>
 *         /data     <SYMLINK to data directory in project root>
 *     /data         <data directory>
 *
 * When creating a new file in the data directory, the file should be added to the
 * data.js file, and the file should be exported from the data.js file.
 *
 * The naming convention for the imported data is:
 *   <singular noun>Data
 *
 * While the naming convention for the exported data is:
 *   <plural noun>
 *
 * For example, the imported data for the Achievements section is `achievementsData` (from achievements.json)
 * and the exported data for the Achievements section is `achievements` (from achievementsData)
 *
 * The files are imported from the local symlinked data directory.
 *
 */

import { getSectionData, resumeDocument } from './resume/document'

/* Export the data to be used in our React components */
export const achievements = getSectionData(resumeDocument, 'achievements', {
  items: [],
}).items
export const education = getSectionData(resumeDocument, 'education', {
  items: [],
}).items
export const experiences = getSectionData(resumeDocument, 'experience', {
  items: [],
}).items
export const glance = getSectionData(resumeDocument, 'glance', {
  items: [],
}).items
export const information = getSectionData(resumeDocument, 'information', {})
export const publications = getSectionData(resumeDocument, 'publications', {
  items: [],
}).items
export const skills = getSectionData(resumeDocument, 'skills', {
  items: [],
}).items
export const summary = getSectionData(resumeDocument, 'summary', {
  content: [],
}).content
