import fs from 'node:fs'
import path from 'node:path'

const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'))
const requiredLegacyFiles = [
  'Achievements.json',
  'AtAGlance.json',
  'Education.json',
  'Experience.json',
  'Highlighter.json',
  'Information.json',
  'Publications.json',
  'Skills.json',
  'Summary.json',
]

const normalizeExperienceItem = experience => {
  const longText =
    experience.responsibility || experience.responsibilities || ''
  const shortText = experience.short || longText

  return {
    ...experience,
    responsibility: longText,
    short: shortText,
    bullets:
      experience.bullets ||
      longText
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
  }
}

export const createLegacyResumeDocument = cwd => {
  const dataDir = path.join(cwd, 'data')
  const missingFiles = requiredLegacyFiles.filter(
    fileName => !fs.existsSync(path.join(dataDir, fileName))
  )

  if (missingFiles.length > 0) {
    throw new Error(
      `Legacy section files not found in data/: ${missingFiles.join(
        ', '
      )}. Restore the old per-section JSON files, then rerun the migrate command.`
    )
  }

  const configData = readJson(path.join(cwd, 'src', 'config.json'))
  const achievementsData = readJson(path.join(dataDir, 'Achievements.json'))
  const educationData = readJson(path.join(dataDir, 'Education.json'))
  const experiencesData = readJson(path.join(dataDir, 'Experience.json'))
  const glanceData = readJson(path.join(dataDir, 'AtAGlance.json'))
  const highlighterData = readJson(path.join(dataDir, 'Highlighter.json'))
  const informationData = readJson(path.join(dataDir, 'Information.json'))
  const publicationsData = readJson(path.join(dataDir, 'Publications.json'))
  const skillsData = readJson(path.join(dataDir, 'Skills.json'))
  const summaryData = readJson(path.join(dataDir, 'Summary.json'))

  return {
    version: 1,
    theme: {
      active: 'classic',
    },
    layout: {
      sections: [
        'information',
        'summary',
        'glance',
        'skills',
        'experience',
        'education',
        'achievements',
        'publications',
      ],
    },
    highlights: highlighterData,
    audiences: {
      default: {},
      public: {
        hideContact: true,
      },
      recruiter: {},
    },
    sections: [
      {
        id: 'information',
        type: 'information',
        title: 'Information',
        display: informationData.meta?.display !== false,
        audiences: ['default', 'public', 'recruiter'],
        data: informationData,
      },
      {
        id: 'summary',
        type: 'summary',
        title: 'Summary',
        display: summaryData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          content: summaryData,
        },
      },
      {
        id: 'glance',
        type: 'glance',
        title: configData['at-a-glance']?.title || 'At A Glance',
        display: glanceData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          items: glanceData,
        },
      },
      {
        id: 'skills',
        type: 'skills',
        title: configData.skills?.title || 'Skills',
        display: skillsData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          columns: configData.skills?.columns || 4,
          arrow: configData.skills?.arrow || '\u276F',
          items: skillsData,
        },
      },
      {
        id: 'experience',
        type: 'experience',
        title: configData.experience?.title || 'Experience',
        display: experiencesData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          displayLongResponsibility:
            configData.experience?.displayLongResponsibility || false,
          displayShortResponsibility:
            configData.experience?.displayShortResponsibility !== false,
          workType: configData.experience?.workType || [],
          workTypeKey: configData.experience?.workTypeKey || 'Key',
          items: experiencesData.map(normalizeExperienceItem),
        },
      },
      {
        id: 'education',
        type: 'education',
        title: configData.education?.title || 'Education',
        display: educationData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          items: educationData,
        },
      },
      {
        id: 'achievements',
        type: 'achievements',
        title:
          configData.achievements?.title ||
          'Awards, Achievements, and Certifications',
        display: achievementsData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          displaySeparator: configData.achievements?.displaySeparator !== false,
          items: achievementsData,
        },
      },
      {
        id: 'publications',
        type: 'publications',
        title: configData.publications?.title || 'Publications and Software',
        display: publicationsData.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          displaySeparator: configData.publications?.displaySeparator !== false,
          items: publicationsData,
        },
      },
    ],
  }
}
