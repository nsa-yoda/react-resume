import type { ResumeDocument } from '../types'

interface JsonResumeProfile {
  url?: string
}

interface JsonResumeSource {
  basics?: {
    name?: string
    label?: string
    phone?: string
    email?: string
    summary?: string
    location?: {
      city?: string
      region?: string
    }
    profiles?: JsonResumeProfile[]
  }
  work?: Array<{
    name?: string
    position?: string
    location?: string
    url?: string
    startDate?: string
    endDate?: string
    summary?: string
    highlights?: string[]
  }>
  education?: Array<{
    studyType?: string
    area?: string
    institution?: string
    location?: string
    startDate?: string
    endDate?: string
  }>
  awards?: Array<{
    title?: string
    summary?: string
    awarder?: string
    date?: string
  }>
  publications?: Array<{
    name?: string
    summary?: string
    publisher?: string
    website?: string
  }>
  skills?: Array<{
    name?: string
  }>
}

const joinDate = (value?: string): string => (value ? `${value}-01` : '')

const normalizeProfiles = (profiles?: JsonResumeProfile[]): string[] =>
  (profiles || []).map(profile => profile.url).filter(Boolean)

export const importJsonResume = (source: JsonResumeSource): ResumeDocument => {
  const basics = source.basics || {}
  const work = source.work || []
  const education = source.education || []
  const awards = source.awards || []
  const publications = source.publications || []
  const skills = source.skills || []

  return {
    version: 1,
    theme: {
      active: 'classic',
    },
    layout: {
      sections: [
        'information',
        'summary',
        'skills',
        'experience',
        'education',
        'achievements',
        'publications',
      ],
    },
    highlights: [],
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
        display: true,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          name: {
            first: basics.name?.split(' ')[0] || '',
            middle: '',
            last: basics.name?.split(' ').slice(1).join(' ') || '',
          },
          title: basics.label || '',
          meta: {
            display: true,
            location: [basics.location?.city, basics.location?.region]
              .filter(Boolean)
              .join(', '),
            phone: basics.phone || '',
            email: {
              address: basics.email || '',
              link: true,
            },
            socials: normalizeProfiles(basics.profiles),
          },
        },
      },
      {
        id: 'summary',
        type: 'summary',
        title: 'Summary',
        display: Boolean(basics.summary),
        audiences: ['default', 'public', 'recruiter'],
        data: {
          content: basics.summary ? [basics.summary] : [],
        },
      },
      {
        id: 'skills',
        type: 'skills',
        title: 'Skills',
        display: skills.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          columns: 4,
          arrow: '\u276F',
          items: skills.map(skill => skill.name).filter(Boolean),
        },
      },
      {
        id: 'experience',
        type: 'experience',
        title: 'Experience',
        display: work.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          displayLongResponsibility: true,
          displayShortResponsibility: false,
          workType: [],
          workTypeKey: 'Key',
          items: work.map(item => ({
            company: {
              name: item.name || '',
              type: item.position || '',
              location: [item.location, item.url].filter(Boolean).join(' | '),
            },
            meta: {
              display: true,
              class: '',
              type: 'full-time',
              remote: 'on-site',
            },
            dates: {
              start: joinDate(item.startDate),
              end: item.endDate ? joinDate(item.endDate) : 'Present',
            },
            title: item.position || '',
            responsibility: item.summary || '',
            short: item.summary || '',
            bullets: item.highlights || [],
          })),
        },
      },
      {
        id: 'education',
        type: 'education',
        title: 'Education',
        display: education.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          items: education.map(item => ({
            degree: {
              short_name: [item.studyType, item.area]
                .filter(Boolean)
                .join(' in '),
              long_name: item.institution || '',
            },
            school: {
              name: item.institution || '',
              location: item.location || '',
            },
            dates: {
              showDate: true,
              start: joinDate(item.startDate),
              end: joinDate(item.endDate),
            },
            meta: {
              display: true,
            },
          })),
        },
      },
      {
        id: 'achievements',
        type: 'achievements',
        title: 'Awards, Achievements, and Certifications',
        display: awards.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          displaySeparator: true,
          items: awards.map(item => ({
            name: item.title || '',
            description: item.summary || item.awarder || '',
            year: item.date || '',
            meta: {
              display: true,
            },
          })),
        },
      },
      {
        id: 'publications',
        type: 'publications',
        title: 'Publications and Software',
        display: publications.length > 0,
        audiences: ['default', 'public', 'recruiter'],
        data: {
          displaySeparator: true,
          items: publications.map(item => ({
            name: item.name || '',
            description: item.summary || item.publisher || '',
            url: item.website || '',
            display: true,
          })),
        },
      },
    ],
  }
}
