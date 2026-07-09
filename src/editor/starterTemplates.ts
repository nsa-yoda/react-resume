import engineeringStarter from '../data/Resume.json'
import type { ResumeDocument } from '../resume/types'

export const academicStarter: ResumeDocument = {
  version: 1,
  theme: {
    active: 'stacked',
  },
  layout: {
    sections: [
      'information',
      'summary',
      'publications',
      'education',
      'achievements',
      'skills',
    ],
  },
  highlights: ['research', 'teaching', 'publication'],
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
          first: 'Avery',
          middle: '',
          last: 'Scholar',
        },
        title: 'Associate Professor of Computer Science',
        meta: {
          location: 'Boston, MA',
          phone: '+1 555-010-0101',
          email: {
            address: 'avery@example.edu',
            link: true,
          },
          socials: ['https://scholar.google.com', 'https://orcid.org'],
          display: true,
        },
      },
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Summary',
      display: true,
      audiences: ['default', 'public', 'recruiter'],
      data: {
        content: [
          'Researcher and educator focused on distributed systems, human-centered tooling, and graduate mentorship.',
        ],
      },
    },
    {
      id: 'publications',
      type: 'publications',
      title: 'Publications',
      display: true,
      audiences: ['default', 'public', 'recruiter'],
      data: {
        displaySeparator: true,
        items: [
          {
            name: 'Designing Reliable Developer Toolchains',
            description:
              'Journal article on reliability patterns for build tooling.',
            url: 'https://example.edu/publications/toolchains',
            display: true,
          },
        ],
      },
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      display: true,
      audiences: ['default', 'public', 'recruiter'],
      data: {
        items: [
          {
            degree: {
              short_name: 'Ph.D. Computer Science',
              long_name:
                'Ph.D. in Computer Science, Thesis on distributed systems',
            },
            school: {
              name: 'Example University',
              location: 'Boston, MA',
            },
            dates: {
              showDate: true,
              start: '2011-09-01',
              end: '2016-06-01',
            },
            meta: {
              display: true,
            },
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'achievements',
      title: 'Grants and Awards',
      display: true,
      audiences: ['default', 'public', 'recruiter'],
      data: {
        displaySeparator: true,
        items: [
          {
            name: 'NSF CAREER Award',
            description:
              'Recognized for research on dependable developer infrastructure.',
            year: '2024',
            meta: {
              display: true,
            },
          },
        ],
      },
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      display: true,
      audiences: ['default', 'public', 'recruiter'],
      data: {
        columns: 3,
        arrow: '•',
        items: ['Distributed Systems', 'Teaching', 'Research Leadership'],
      },
    },
  ],
}

export const starterTemplates: Record<string, ResumeDocument> = {
  academic: academicStarter,
  engineering: engineeringStarter as ResumeDocument,
}
