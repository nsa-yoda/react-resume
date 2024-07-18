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

/* Import files from the symlinked data directory within the source directory */
import achievementData from './data/Achievements.json'
import educationData from './data/Education.json'
import experiencesData from './data/Experience.json'
import glanceData from './data/AtAGlance.json'
import informationData from './data/Information.json'
import publicationsData from './data/Publications.json'
import skillsData from './data/Skills.json'
import summaryData from './data/Summary.json'

/* Export the data to be used in our React components */
export const achievements = achievementData
export const education = educationData
export const experiences = experiencesData
export const glance = glanceData
export const information = informationData
export const publications = publicationsData
export const skills = skillsData
export const summary = summaryData