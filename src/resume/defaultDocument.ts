import { defaultSectionOrder } from '../sectionOrder'
import type {
  AchievementItem,
  EducationItem,
  ExperienceData,
  ListSectionData,
  PublicationItem,
  ResumeDocument,
  ResumeSection,
  ResumeSectionType,
  SkillsData,
  SummaryData,
} from './types'

const defaultAudiences = ['default', 'public', 'recruiter']

const createSection = <TData>(
  id: ResumeSectionType,
  title: string,
  data: TData,
  display = false
): ResumeSection<TData> => ({
  id,
  type: id,
  title,
  display,
  audiences: defaultAudiences,
  data,
})

export const createDefaultResumeDocument = (): ResumeDocument => ({
  version: 1,
  theme: {
    active: 'classic',
  },
  layout: {
    sections: defaultSectionOrder,
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
    createSection('information', 'Information', {
      name: {
        first: '',
        middle: '',
        last: '',
      },
      title: '',
      meta: {
        location: '',
        phone: '',
        email: {
          address: '',
          link: false,
        },
        socials: [],
        display: true,
      },
    }),
    createSection<SummaryData>('summary', 'Summary', { content: [] }),
    createSection<ListSectionData<string>>('glance', 'At A Glance', {
      items: [],
    }),
    createSection('skills', 'Skills', {
      columns: 4,
      arrow: '\u276F',
      items: [],
    } as SkillsData),
    createSection('experience', 'Experience', {
      displayLongResponsibility: false,
      displayShortResponsibility: true,
      workType: [],
      workTypeKey: 'Key',
      items: [],
    } as ExperienceData),
    createSection<ListSectionData<EducationItem>>('education', 'Education', {
      items: [],
    }),
    createSection('achievements', 'Awards, Achievements, and Certifications', {
      displaySeparator: true,
      items: [],
    } as ListSectionData<AchievementItem> & { displaySeparator?: boolean }),
    createSection('publications', 'Publications and Software', {
      displaySeparator: true,
      items: [],
    } as ListSectionData<PublicationItem> & { displaySeparator?: boolean }),
  ],
})
